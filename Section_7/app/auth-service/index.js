const express = require('express');
const ErrorHandlingMiddleware = require('../middleware/error-handling');

const PORT = process.env.PORT;

const app = express();
const Middleware = require('../middleware/middleware');

const UsersController = require('./controllers/users-controller');

Middleware(app);
app.use('', UsersController);

ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`Auth Service listening on port ${PORT}`);
});
