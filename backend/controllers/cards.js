const Card = require('../models/card');
const ValidationError = require('../errors/validation-error');
const DocumentNotFoundError = require('../errors/document-not-found-error');
const IncorrectRequest = require('../errors/incorrect-request-error');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Неправильный запрос'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(200).send(cards))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
        return;
      }
      if (card.owner.valueOf() !== req.user._id) {
        next(new ValidationError('Нельзя удалять чужие карточки'));
        return;
      }
      Card.deleteOne(card)
        .orFail()
        .then(() => res.status(200).send({ data: card }))
        .catch((err) => res.send({ message: err.message }));
    })
    .catch(next);
};

module.exports.addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequest('Запрашиваемый пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectRequest('Неправильный запрос'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectRequest('Запрашиваемый пользователь не найден'));
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectRequest('Неправильный запрос'));
      }
      if (err.name === 'DocumentNotFoundError') {
        next(new DocumentNotFoundError('Запрашиваемые данные не найдены.'));
      } else {
        next(err);
      }
    });
};
