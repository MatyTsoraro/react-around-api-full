const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Please enter a valid email')
      .messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email',
      }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Please lengthen this password to 8 characters or more',
    }),
  }),
});

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Please lengthen this text to 2 characters or more',
      'string.max': 'Please lengthen this text to 30 characters or less',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Please lengthen this text to 2 characters or more',
      'string.max': 'Please lengthen this text to 30 characters or less',
    }),
    avatar: Joi.string()
      .custom(validateURL)
      .message('Please enter a valid URL for the avatar'),
    email: Joi.string()
      .required()
      .email()
      .message('Please enter a valid email')
      .messages({
        'string.required': 'Email is required',
        'string.email': 'Please enter a valid email',
      }),
    password: Joi.string().required().min(8).messages({
      'string.empty': 'Password is required',
      'string.min': 'Please lengthen this password to 8 characters or more',
    }),
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Please lengthen this text to 2 characters or more',
      'string.max': 'Please lengthen this text to 30 characters or less',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Please lengthen this text to 2 characters or more',
      'string.max': 'Please lengthen this text to 30 characters or less',
    }),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom(validateURL)
      .message('Please enter a valid URL for the avatar'),
  }),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Sorry, it is invalid id');
      }),
  }),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      'string.empty': 'A name is required',
      'string.min': 'Please lengthen this text to 2 characters or more',
      'string.max': 'Please lengthen this text to 30 characters or less',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      'string.empty': 'Please enter a URL',
      'string.uri': 'Please enter a valid URL for picture',
    }),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserBody,
  validateUserProfile,
  validateUserAvatar,
  validateObjectId,
  validateCardBody,
};
