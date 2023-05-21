const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizeError = require('../errors/UnauthorizeError');
const BadRequestError = require('../errors/BadRequestError');

const { ERROR_MESSAGE } = require('../utils/constants');

const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((data) => {
      const token = jwt.sign(
        { _id: data._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-dev-secret',
        {
          expiresIn: '7d',
        }
      );
      const { password, ...user } = data._doc;
      res.send({ data: user, token });
    })
    .catch(() => {
      next(new UnauthorizeError('Incorrect email or password'));
    });
};

// GET
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// GET
const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_USER_DATA));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// POST
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(ERROR_MESSAGE.CONFLICT);
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((data) => {
      const { password, ...user } = data._doc;
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Invalid email or password'));
      } else {
        next(err);
      }
    });
};

// PATCH
const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_USER_DATA));
      } else {
        next(err);
      }
    });
};

// PATCH
const updateUserAvatar = (req, res, next) => {
  const currentUser = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    { _id: currentUser },
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_USER_DATA));
      } else {
        next(err);
      }
    });
};

module.exports = {
  userLogin,
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateUserAvatar,
};
