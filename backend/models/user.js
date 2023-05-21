const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      // the requirements for every user name field are described below:
      type: String,
      required: [true, 'Please enter your name'],
      default: 'Jacques Cousteau',
      minlength: [2, 'Please lengthen this text to 2 characters or more'],
      maxlength: [30, 'Please lengthen this text to 30 characters or less'],
    },
    about: {
      // the requirements for every user about field are described below:
      type: String,
      required: [true, 'Please enter description'],
      default: 'Explorer',
      minlength: [2, 'Please lengthen this text to 2 characters or more'],
      maxlength: [30, 'Please lengthen this text to 30 characters or less'],
    },
    avatar: {
      type: String,
      required: [true, 'Please enter a URL'],
      default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
  },
  { versionKey: false }
);

userSchema.statics.findUserByCredentials = function (email, password) {
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

module.exports = mongoose.model('user', userSchema);
