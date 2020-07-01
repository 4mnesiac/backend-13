const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const Card = require(path.join('..', 'models', 'card'));

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (card) {
        res.status(200).send({ success: 'Карточка успешно удалена' });
      } else {
        res.status(404).send({
          error: 'Ошибка: неверно указан id',
        });
      }
    })
    .catch((err) => res.status(500).send({ error: `Ошибка удаления карточки: ${err}` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.status(200).send(
      card,
    ))
    .catch((err) => res.status(500).send({
      error: `Произошла ошибка: ${err}`,
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
  })
    .then((card) => res.send({
      success: `Карточка ${name} успешно создана`,
      data: card,
    }))
    .catch((err) => res.status(500).send({
      error: `Произошла ошибка: ${err}`,
    }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ _id: req.params.cardId, likes: card.likes.length }))
    .catch((err) => res.status(500).send({ error: `Произошла ошибка: ${err}` }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.status(200).send({ _id: req.params.cardId, likes: card.likes.length }))
    .catch((err) => res.status(500).send({ error: `Произошла ошибка: ${err}` }));
};
