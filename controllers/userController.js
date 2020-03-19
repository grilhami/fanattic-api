const moment = require('moment');
const { generateHash, compareHash, 
        decrypt, encrypt } = require('../helpers').encryption;
const { Sequelize, sequelize, 
        user, artist, 
        end_user, manager, 
        content_specialist, god } = require('../models');

const { Op } = Sequelize;
const { validator } = require('../helpers');


const { errorHandler, jwt } = require('../helpers');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, ep, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: `email and password is required`,
          debug: req.body,
        });
      }
      const userObj = await user.findOne({
        where: {
          [Op.or]: {
            email,
            username: email,
          },
        },
      });

      // const dp = decrypt(ep); // decrypted password
      if (!userObj) {
        return res.status(404).json({
          message: 'Wrong email, username, or password',
          error: 'Wrong email, username, or password',
        });
      }
      if (!compareHash(password, userObj.password)) {
        return res.status(401).json({
          message: 'Wrong email, username, or password',
          error: 'Wrong email, username, or password',
        });
      }

      return sequelize
        .transaction(t =>
          userObj.update(
            {
              lastLogin: moment(),
            },
            { transaction: t },
          ),
        )
        .then(() => {
          const token = jwt.createToken({
            id: userObj.id,
            email: userObj.email,
          });
          return res.status(200).json({
            message: 'Login Successful',
            user: {
              id: userObj.id,
              email: userObj.email,
              profilePicture: userObj.profilePicture,
              phone: userObj.phone,
            },
            token,
          });
        })
        .catch(err => errorHandler(res, err));
    } catch (err) {
      return errorHandler(res, err);
    }
  },
  // eslint-disable-next-line consistent-return
  register: (req, res) => {
    const { email, username, fullName, password, phone, bio, type} = req.body;
    if (!email || !username || !fullName || !password || !phone || !bio || !type) {
      return res.status(400).json({
        message: 'email, username, fullName, ep, bio, phone, and type are required',
        debug: req.body,
      });
    }

    const userTypes = ['end', 'artist', 'manager', 'content', 'god'];

    if (!(userTypes.includes(type))) {
      return res.status(400).json({
        message: "something wrong with the type field.",
        debug: req.body,
      })
    } 

    // const dp = decrypt(ep); // decrypted password
    user
      .findOne({ where: { email } })
      .then(obj => {
        if (obj) {
          return res.status(409).json({
            message: 'Email already exists!',
            error: 'Email already exists!',
          });
        }

        const results = validator({
          email,
          username,
          fullName,
          // ep,
          password,
          phone,
        });

        if (results.length > 0) {
          return res
            .status(422)
            .send({ message: 'Invalid Form', error: 'Invalid Form', results });
        }


        return sequelize
          .transaction(t =>
            user
              .create(
                {
                  email,
                  username,
                  password: generateHash(password),
                  fullName,
                  bio,
                  // profilePicure: enter patht here
                  phone,
                  isVerified: false,
                  lastLogin: moment(),
                  type: type
                },
                { transaction: t },
              )
              .then(userObj => userObj),
          )
          .then(result => {

            // Create 'end' subuser
            if (req.body.type == 'end') {
              end_user.create({
                userId: result.id,
                preference: req.body.preference
                },
              ).then( subUserObj => {
                console.log("Subuser Registered.");
                return subUserObj;
              });
            }

            // Create 'artist' subuser
            if (req.body.type == 'artist') {
              artist.create({
                userId: result.id,
                label: req.body.label
                },
              ).then( subUserObj => {
                console.log("Subuser Registered.");
                return subUserObj;
              });
            }

            // Create 'manager' subuser
            if (req.body.type == 'manager') {
              manager.create({
                userId: result.id,
                company: req.body.company
                },
              ).then( subUserObj => {
                console.log("Subuser Registered.");
                return subUserObj;
              });
            }

            // Create 'content' subuser
            if (req.body.type == 'content') {
              content_specialist.create({
                userId: result.id,
                platform: req.body.platform
                },
              ).then( subUserObj => {
                console.log("Subuser Registered.");
                return subUserObj;
              });
            }

            // Create 'god' subuser
            if (req.body.type == 'god') {
              god.create({
                userId: result.id,
                godLabel: req.body.godLabel
                },
              ).then( subUserObj => {
                console.log("Subuser Registered.");
                return subUserObj;
              });
            }
            
            const token = jwt.createToken({ id: result.id });
            return res.status(200).json({
              message: 'Registration Successful',
              result: {
                token,
                email: result.email,
                fullName,
                bio: result.bio,
                profilePicture: result.profilePicture,
                phone: result.phone,
                isVerified: result.isVerified,
              },
            });
          })
          .catch(err => {
            return errorHandler(res, err);
          });
      })
      .catch(err => errorHandler(res, err));
  },
  // Keep Login / Get Dashboard Data
  getUserData: (req, res) => {
    const { username } = req.params; 
    user
      .findOne({
        where: {
          username: username
        },
      })
      .then(userObj => {
        const token = jwt.createToken({ id: userObj.id, email: userObj.email });
        if (!userObj) {
          return res
            .status(404)
            .json({ message: 'User not found !', error: 'User not found !' });
        }

        return res.status(200).json({
          message: 'GET User Data Successful',
          result: {
            token,
            email: userObj.email,
            fullName: userObj.fullName,
            username: userObj.username,
            bio: userObj.bio,
            profilePicture: userObj.profilePicture,
            isVerified: userObj.isVerified
            // id: userObj.id,
            // email: userObj.email,
            // firstName: userObj.firstName,
            // lastName: userObj.lastName,
            // role: userObj.role,
            // bio: userObj.bio,
            // birthday: userObj.birthday,
            // profilePicture: userObj.profilePicture,
            // gender: userObj.gender,
            // phone: userObj.phone,
            // address: userObj.address,
            // city: userObj.city,
            // postalCode: userObj.postalCode,
            // accountVerified: userObj.isVerified,
            // membership: userObj.membership,
            // lastProfession: userObj.lastProfession,
            // referral: userObj.referral,
            // attendees: userObj.attendees,
          },
        });
      })
      .catch(err => errorHandler(res, err));
  },
  verify: (req, res) => {
    user
      .findOne({
        where: {
          id: req.user.id,
          email: req.user.email,
        },
      })
      .then(userObj => {
        if (!userObj) {
          return res.status(404).json({ message: 'User not found !' });
        }
        if (userObj.isVerified) {
          return res.status(200).json({ message: 'Email is already verified' });
        }

        return sequelize
          .transaction(t =>
            userObj.update(
              {
                isVerified: true,
              },
              { transaction: t },
            ),
          )
          .then(() =>
            res.status(200).json({ message: 'Email is now verified' }),
          )
          .catch(err => errorHandler(res, err));
      })
      .catch(err => errorHandler(res, err));
  },

  // TODO: include other subusers
  allSubUserType: (req, res) => {
    const { subUserType } = req.params;

    const userTypes = ['end', 'artist', 'manager', 'content', 'god'];

    if (!(userTypes.includes(subUserType))) {
      return res.status(400).json({
        message: "something wrong with the type field.",
        debug: req.body,
      })
    } 

    var subUserModel;
    switch (subUserType) {
      case 'end':
        subUserModel = end_user;
        break;
      case 'artist':
        subUserModel = artist;
        break;
      case 'manager':
        subUserModel = manager;
        break;
      case 'content':
        subUserModel = content_specialist;
        break;
      case 'god':
        subUserModel = god;
        break;
    }

    subUserModel.findAll().then(
      data =>
            res.status(200).json({
            message: 'Get all artists',
            data,
            })
    ).catch(
      err => errorHandler(res, err)
    );
  },
  updateUser: async (req, res) => {
    const { username } = req.params;
    const { email, newUsername, fullName, password, phone, bio} = req.body;
    if (!email || !username || !fullName || !password || !phone || !bio) {
      return res.status(400).json({
        message: 'email, username, fullName, ep, bio, phone, and type are required',
        debug: req.body,
      });
    }

    if (!newUsername) {
      const newUsername = username;
    }

    const getUser = await user.findOne({ where: {username: username}});
    const type = getUser.type;

    const userTypes = ['end', 'artist', 'manager', 'content', 'god'];

    if (!(userTypes.includes(type))) {
      return res.status(400).json({
        message: "something wrong with the type field.",
        debug: req.body,
      })
    }

    var subUserModel;
    switch (type) {
      case 'end':
        subUserModel = end_user;
        break;
      case 'artist':
        subUserModel = artist;
        break;
      case 'manager':
        subUserModel = manager;
        break;
      case 'content':
        subUserModel = content_specialist;
        break;
      case 'god':
        subUserModel = god;
        break;
      default: subUserModel = null;
    }

    if (subUserModel == null) {
      return res.status(400).json({
        message: "Something wrong with the user type.",
        debug: req.body,
      })
    }

    const getSubUserObj = await subUserModel.findOne({where: {userId: getUser.id}});
    // const dp = decrypt(ep); // decrypted password
    user
      .findOne({ where: { email } })
      .then(obj => {
        // if (obj) {
        //   return res.status(409).json({
        //     message: 'Email already exists!',
        //     error: 'Email already exists!',
        //   });
        // }

        const results = validator({
          email,
          username: newUsername,
          fullName,
          // ep,
          password,
          phone,
        });

        if (results.length > 0) {
          return res
            .status(422)
            .send({ message: 'Invalid Form', error: 'Invalid Form', results });
        }

        const userData = {
          email,
          username: newUsername,
          password: generateHash(password),
          fullName,
          bio,
          // profilePicure: enter patht here
          phone,
          isVerified: false,
          lastLogin: moment(),
          type: type
        }

        return sequelize
          .transaction(t =>
            user
              .update(
                userData,
                { where: { username: username } },
                { transaction: t }
              )
              .then(userObj => userObj),
          )
          .then(result => {

            // Create 'end' subuser
            if (type == 'end') {
              end_user.update(
                {
                  where: {userId: getUser.id},
                },
                {
                preference: req.body.subUser.preference
                },
              ).then( subUserObj => {
                console.log("Subuser Updated.");
                return subUserObj;
              });
            }

            // Create 'artist' subuser
            if (type == 'artist') {
              artist.update(
                {
                  where: {userId: getUser.id},
                },
                {
                  label: req.body.subUser.label
                },
              ).then( subUserObj => {
                console.log("Subuser Updated.");
                return subUserObj;
              });
            }

            // Create 'manager' subuser
            if (type == 'manager') {
              manager.update(
                {
                  company: req.body.subUser.company
                },
                {
                  where: {userId: getUser.id},
                }
              ).then( subUserObj => {
                console.log("Subuser Updated.");
                return subUserObj;
              });
            }

            // Create 'content' subuser
            if (type == 'content') {
              content_specialist.update(
                {
                  where: {userId: getUser.id},
                },
                {
                  platform: req.body.subUser.platform
                },
              ).then( subUserObj => {
                console.log("Subuser Updated.");
                return subUserObj;
              });
            }

            // Create 'god' subuser
            if (type == 'god') {
              god.update(
                {
                  where: {userId: getUser.id},
                },
                {
                  godLabel: req.body.subUser.godLabel
                },
              ).then( subUserObj => {
                console.log("Subuser Updated.");
                return subUserObj;
              });
            }
            
            const token = jwt.createToken({ id: result.id });
            return res.status(200).json({
              message: 'Registration Successful',
              result: {
                token,
                email: result.email,
                fullName,
                bio: result.bio,
                profilePicture: result.profilePicture,
                phone: result.phone,
                isVerified: result.isVerified,
                subUser: {
                  subUser: getSubUserObj.dataValues,
                }
              },
            });
          })
          .catch(err => {
            return errorHandler(res, err);
          });
      })
      .catch(err => errorHandler(res, err));
  },
  deleteUser: async (req, res) => {
    const { username } = req.params;

    const getUser = await user.findOne({ where: {username} })
    const userId = getUser.id;
    const subUserType = getUser.type;

    var subUserModel;
    switch (subUserType) {
      case 'end':
        subUserModel = end_user;
        break;
      case 'artist':
        subUserModel = artist;
        break;
      case 'manager':
        subUserModel = manager;
        break;
      case 'content':
        subUserModel = content_specialist;
        break;
      case 'god':
        subUserModel = god;
        break;
      default: subUserModel;
    }

    if (subUserModel == null) {
      return res.status(400).json({
        message: `Somethin wrong with for user type for deletion.`,
        debug: req.body,
      });
    }

    subUserModel.destroy(
      { where: {userId} }
    ).then(() => {
      user.destroy(
        { where: {username} }
      ).then(() =>
        res.status(200).json({
          message: "User deleted."
        })
      ).catch(err => errorHandler(res, err))
    }
    ).catch(err => errorHandler(res, err));
  },

  addStory: (req, res) => {
    const { id: userId } = res.userData;
  },
  showStory: (req, res) => {
    const { id: userId } = res.userData;
  },
  profile: (req, res) => {
    const { id: userId } = res.userData;
  },
};
