const moment = require('moment');
const { generateHash, compareHash, decrypt } = require('../helpers').encryption;
const { Sequelize, sequelize, user } = require('../models');

const { Op } = Sequelize;
const { validator } = require('../helpers');

const { errorHandler, jwt } = require('../helpers');

module.exports = {
  login: async (req, res) => {
    try {
      const { email, ep } = req.body;
      if (!email || !ep) {
        return res.status(400).json({
          message: `email and ep is required`,
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

      const dp = decrypt(ep); // decrypted password
      if (!userObj) {
        return res.status(404).json({
          message: 'Wrong email, username, or password',
          error: 'Wrong email, username, or password',
        });
      }
      if (!compareHash(dp, userObj.password)) {
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
    const { email, username, fullName, ep, phone } = req.body;
    if (!email || !username || !fullName || !ep || !phone) {
      return res.status(400).json({
        message: 'email, username, fullName, ep and phone is required',
        debug: req.body,
      });
    }
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

        const results = validator({
          email,
          username,
          fullName,
          ep,
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
                  password: generateHash(dp),
                  fullName,
                  phone,
                  isVerified: false,
                  lastLogin: moment(),
                },
                { transaction: t },
              )
              .then(userObj => userObj),
          )
          .then(result => {
            const token = jwt.createToken({ id: result.id });
            return res.status(200).json({
              message: 'Registration Successful',
              result: {
                token,
                email: result.email,
                fullName,
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
  // getEvent: (req, res) => {
  //   const { userId } = req.params;
  // },
};
