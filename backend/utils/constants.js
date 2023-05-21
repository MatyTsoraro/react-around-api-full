const ERROR_CODE = {
  INCORRECT_DATA: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGE = {
  USER_NOT_FOUND: 'Sorry, no user was found with this id',
  CARD_NOT_FOUND: 'Sorry, no card was found with this id',
  INCORRECT_USER_DATA: 'Incorrect user data',
  INCORRECT_AVATAR_DATA: 'Incorrect avatar data',
  INCORRECT_CARD_DATA: 'Incorrect card data',
  NOT_FOUND: 'Sorry, the requested resource was not found',
  INTERNAL_SERVER_ERROR: 'Internal server error has occurred',
  CONFLICT: 'A user with this data already registered',
  BAD_REQUEST: 'This request cannot be fulfilled due to bad syntax',
  UNAUTHORIZED: 'Authorization required',
  FORBIDDEN: 'Sorry, you are not authorized to remove others card',
};

module.exports = {
  ERROR_CODE,
  ERROR_MESSAGE,
};
