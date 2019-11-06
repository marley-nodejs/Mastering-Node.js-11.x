const express = require('express');
const Middleware = require('../middleware/middleware');
const AuthenticationMiddleware = require('./middleware/auth');
const ErrorHandlingMiddleware = require('../middleware/error-handling');

const PORT = process.env.PORT;

const app = express();

const PlansController = require('./controllers/plans-controller');

Middleware(app);
AuthenticationMiddleware(app);

app.use('', PlansController);

// Error middleware must be defined after all other middleware/routes
ErrorHandlingMiddleware(app);

app.listen(PORT, () => {
  console.log(`Plans service listening on port ${PORT}`);
});
