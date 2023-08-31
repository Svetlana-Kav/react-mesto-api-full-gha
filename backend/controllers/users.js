// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationError = require('../errors/validation-error');
const DuplicateKeyError = require('../errors/duplicate-key-error');
const DocumentNotFoundError = require('../errors/document-not-found-error');
const IncorrectRequest = require('../errors/incorrect-request-error');
require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => {
          const { _id } = user;

          return res.status(201).send({
            email,
            _id,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Неправильный запрос'));
          }
          if (err.code === 11000) {
            next(new DuplicateKeyError('Пользователь с таким email уже существует'));
          } else {
            next(err);
          }
        });
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequest('Запрашиваемый пользователь не найден'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequest('Запрашиваемый пользователь не найден'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};

module.exports.editProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequest('Запрашиваемый пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectRequest('Неправильный запрос'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};

module.exports.editAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(200).send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequest('Запрашиваемый пользователь не найден'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectRequest('Неправильный запрос'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};
