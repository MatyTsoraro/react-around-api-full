const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { SALT_ROUNDS } = require('../utils/helpers');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
    required: true,
  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: [2, 'The minimum length of About is 2'],
    maxlength: [30, 'The maximum length of About is 30'],
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Invalid URL',
    },
  },
  email: {
    type: String,
    required: [true, 'The "email" field must be filled in.'],
    unique: true,

    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Valid email is required',
    },
  },
  // password: {
  //   type: String,
  //   required: [true, 'The "Password" field must be filled in.'],
  //   select: false, // remove the select field
  // },
});

userSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user;
      });
    });
};

userSchema.methods.toJSON = function toJSON() {
  const {
    _id,
    name,
    about,
    avatar,
    email,
  } = this;
  return {
    id: _id,
    name,
    about,
    avatar,
    email,
  };
};

module.exports = mongoose.model('User', userSchema);
