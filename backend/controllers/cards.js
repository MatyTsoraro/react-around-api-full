const Card = require('../models/card');
const { customError, HTTP_STATUS_CODES } = require('../utils/consts');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(HTTP_STATUS_CODES.OK).send({ data: cards }))
    .catch(() => customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error'));
};

const createCard = (req, res) => {
  const { name, link, likes } = req.body;
  const { _id } = req.user;

  Card.create({
    name,
    link,
    likes,
    owner: _id,
  })
    .then((card) => res.status(HTTP_STATUS_CODES.CREATED).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({
          message: `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        });
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error');
      }
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        const error = new Error('Card not found');
        error.status = HTTP_STATUS_CODES.NOT_FOUND;
        throw error;
      }

      if (card.owner.toString() !== _id) {
        customError(res, HTTP_STATUS_CODES.FORBIDDEN, 'You are not authorized to delete this card');
      } else {
        Card.deleteOne({ _id: cardId })
          .then(() => res.send({ message: 'Card deleted successfully' }))
          .catch(() => customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Card id is incorrect');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'Card is not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
      }
    });
};

const updateLikes = (req, res, operator) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findOne({ _id: cardId })
    .then((card) => {
      if (!card) {
        const error = new Error('Card not found');
        error.status = HTTP_STATUS_CODES.NOT_FOUND;
        throw error;
      }

      if (card.likes.includes(_id)) {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'You have already liked this card');
      } else {
        Card.findByIdAndUpdate(
          cardId,
          { [operator]: { likes: _id } },
          { new: true },
        )
          .then((updatedCard) => res.send({ data: updatedCard }))
          .catch(() => customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'We have encountered an error'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        customError(res, HTTP_STATUS_CODES.BAD_REQUEST, 'Invalid card id');
      } else if (err.status === HTTP_STATUS_CODES.NOT_FOUND) {
        customError(res, HTTP_STATUS_CODES.NOT_FOUND, 'Card not found');
      } else {
        customError(res, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, 'Something went wrong');
      }
    });
};



const likeCard = (req, res) => updateLikes(req, res, '$addToSet');

const unlikeCard = (req, res) => updateLikes(req, res, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
