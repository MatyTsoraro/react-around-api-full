const bcrypt = require('bcryptjs'); // import bcrypt library
const User = require('../models/user');
const { customError, HTTP_STATUS_CODES } = require('../utils/consts');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(HTTP_STATUS_CODES.OK).send({ data: users }))
    .catch(() => customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error'));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      const error = new Error('User Not Found');
      error.status = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.status(HTTP_STATUS_CODES.OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid user ID');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'User ID not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const createUser = async (req, res) => {
  const { name = 'User', about = 'About', avatar = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y', email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, about, avatar, email, password: hashedPassword });
    res.status(HTTP_STATUS_CODES.CREATED).send({ data: user });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
        message: `${Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')}`,
      });
    } else {
      customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
    }
  }
};

const updateUserData = (req, res) => {
  const id = req.user._id;
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(id, { name, about, avatar }, { runValidators: true })
    .orFail(() => {
      const error = new Error('User ID not found');
      error.status = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid user ID');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'User ID not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) {
    return customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Please update both name and about fields');
  }
  return updateUserData(req, res);
};




const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      const error = new Error('User ID not found');
      error.status = HTTP_STATUS_CODES.NOT_FOUND;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid user ID');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'User ID not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
