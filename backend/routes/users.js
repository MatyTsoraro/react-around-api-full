const router = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
  createUser,
  login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

// Public routes
router.post('/users', createUser);
router.post('/users/login', login);

// Protected routes
router.use(auth); // middleware for all protected routes
router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.patch('/users/:userId', updateUser);
router.patch('/users/:userId/avatar', updateAvatar);
router.get('/users/me', getCurrentUser);

module.exports = router;
