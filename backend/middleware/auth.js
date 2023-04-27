const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'mysecretkey');
  } catch (err) {
    return res.status(401).send({ message: 'Authorization required' });
  }
  req.user = { _id: payload._id };
  next();
};

module.exports = auth;
