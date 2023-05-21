const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsController');

const {
  validateCardBody,
  validateObjectId,
} = require('../middleware/validation');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateCardBody, createCard);
cardsRouter.delete('/:_id', validateObjectId, deleteCard);
cardsRouter.put('/:_id/likes', validateObjectId, likeCard);
cardsRouter.delete('/:_id/likes', validateObjectId, dislikeCard);

module.exports = cardsRouter;
