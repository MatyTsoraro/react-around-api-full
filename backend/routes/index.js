const router = require('express').Router();
const {
  validateAuthentication,
  validateUserBody,
} = require('../middleware/validation');
const { userLogin, createUser } = require('../controllers/usersController');
const auth = require('../middleware/auth');

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const notFoundRouter = require('./notFoundRoute');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, userLogin);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('/*', notFoundRouter);

module.exports = router;
