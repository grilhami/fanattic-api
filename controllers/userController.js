const moment = require('moment');
const { generateHash, compareHash, decrypt } = require('../helpers').encryption;
const { Sequelize, sequelize, user } = require('../models');

const { Op } = Sequelize;
const { validate } = require('../helpers').validator;

const { errorHandler, jwt } = require('../helpers');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, ep } = req.body;
      const userObj = await user.findOne({
        where: {
          [Op.or]: {
            email,
            username: email,
          },
        },
      });

      const dp = decrypt(ep); // decrypted password
      if (!userObj) {
        console.log('User not found !');
        return res.status(404).json({
          message: 'Wrong email, username, or password',
          error: 'Wrong email, username, or password',
        });
      }
      if (!compareHash(dp, userObj.password)) {
        console.log("Password didn't match!");
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
  register: (req, res) => {
    const { email, username, ep, phone } = req.body;
    const dp = decrypt(ep); // decrypted password
    user
      .findOne({ where: { email } })
      .then(obj => {
        if (obj) {
          return res.status(409).json({
            message: 'Email already exists!',
            error: 'Email already exists!',
          });
        }

        console.log(
          'Registration Attempt || ',
          `Email: ${email} at ${new Date()}`,
        );
        const results = validate({
          email,
          username,
          ep,
          phone,
        });

        if (results.length > 0) {
          console.log('Invalid Form Data', results);
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
                  password: generateHash(dp),
                  phone,
                  isVerified: false,
                  lastLogin: moment(),
                },
                { transaction: t },
              )
              .then(userObj => userObj),
          )
          .then(result => {
            console.log('Registration success');
            const token = jwt.createToken({ id: result.id });
            return res.status(200).json({
              message: 'Registration Successful',
              result: {
                token,
                email: result.email,
                profilePicture: result.profilePicture,
                phone: result.phone,
              },
            });
          })
          .catch(err => {
            console.log('Registration failure');
            return errorHandler(res, err);
          });
      })
      .catch(err => errorHandler(res, err));
  },
  // Keep Login / Get Dashboard Data
  getUserData(req, res) {
    console.log('Keep login', req.user.email);
    user
      .findOne({
        where: {
          id: req.user.id,
          email: req.user.email,
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
            id: userObj.id,
            email: userObj.email,
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            role: userObj.role,
            birthday: userObj.birthday,
            profilePicture: userObj.profilePicture,
            gender: userObj.gender,
            phone: userObj.phone,
            address: userObj.address,
            city: userObj.city,
            postalCode: userObj.postalCode,
            accountVerified: userObj.isVerified,
            membership: userObj.membership,
            lastProfession: userObj.lastProfession,
            referral: userObj.referral,
            attendees: userObj.attendees,
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
};
