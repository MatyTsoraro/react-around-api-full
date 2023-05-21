const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { ERROR_MESSAGE } = require('../utils/constants');

// GET
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// POST
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_CARD_DATA));
      } else {
        next(err);
      }
    });
};

// DELETE
const deleteCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
    .then((card) => {
      const { owner } = card;
      if (owner != userId) {
        return next(new ForbiddenError(ERROR_MESSAGE.FORBIDDEN));
      }
      return Card.findByIdAndRemove(cardId).then(() => res.send(card));
    })
    .catch(next);
};

// PUT
const likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
    .then((likes) => res.status(200).send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_CARD_DATA));
      } else {
        next(err);
      }
    });
};

// DELETE
const dislikeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundError(ERROR_MESSAGE.CARD_NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_CARD_DATA));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
