const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const { regularLink } = require('../utils/constants');
const {
  getProfile,
  getUsers,
  getUser,
  editProfile,
  editAvatar,
} = require('../controllers/users');
require('dotenv').config();

router.get('/', getUsers);

router.get('/me', getProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(regularLink),
  }),
}), editAvatar);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

module.exports = router;
