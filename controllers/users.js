const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const User = require(path.join('..', 'models', 'user'));

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      if (user) {
        res.status(200).send(
          user,
        );
      } else {
        res.status(404).send({
          error: 'Ошибка: неверно указан id',
        });
      }
    })
    .catch((err) => res.status(500).send(err));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.status(200).send(
      user,
    ))
    .catch((err) => res.status(500).send({
      error: `Произошла ошибка: ${err}`,
    }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({
      success: `Пользователь ${name} успешно создан`,
      data: user,
    }))
    .catch((err) => res.status(500).send({
      error: `Произошла ошибка: ${err}`,
    }));
};

module.exports.updateProfile = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name: req.body.name }, { new: true })
    .then((user) => {
      if (req.body.name) res.send({ data: user });
      res.status(404).send({ error: 'Ошибка запроса: неверное имя пользователя' });
    })
    .catch((err) => res.status(500).send({ error: `Произошла ошибка: ${err}` }));
};

module.exports.updateAvatar = (req, res) => {
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar: req.body.avatar }, { new: true })
    .then((user) => {
      if (req.body.name) res.send({ data: user });
      res.status(404).send({ message: 'Ошибка запроса: Не указан новый аватар' });
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};
