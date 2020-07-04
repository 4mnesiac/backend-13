# Backend 13. REST API, SQL & NoSQL, MongoDB

### Описание

Яндекс Практикум, 13 спринт. Реализация REST API.

### Развертывание

Развертывание с помощью скрипта **start**.

```bash
npm run start
```

Для отладки и внесения изменений используется режим **dev** с "hot reload".

```bash
npm run dev
```

Приложение подключается к серверу Mongo по адресу

```bash
mongodb://localhost:27017/mestodb
```

### Версии

v.1.0.0 - инициализация проекта

v.1.0.1 - обновлен README.md, package.json

v.1.0.2 - внесены следующие изменения:

+ исправлены методы обновления профиля и аватара;
+ для валидации URL добавлен модуль 'validator', улучшено регулярное выражение на проверку ссылки на изображение аватара;
+ обновлена схема данных для запросов и ответов;
+ добавлены обработчики ошибок - теперь ошибки клиента и сервера отдаются корректно;
+ теперь при лайке\дизлайке карточки, отсутствующей в Базе данных, ошибка обрабатывается корректно;
+ теперь запуск приложения происходит после добавления всех обработчиков;
+ обновлены 'ref' ссылки в моделях карточек и пользователей;
