const path = require('path');

module.exports = {
  development: {
    host: 'localhost',
    username: 'root',
    password: '123456789',
    port: 3309,
    database: 'Users',
    dialect: 'mysql'
  },
  production: {
    host: 'localhost',
    username: 'root',
    password: '123456789',
    port: 3309,
    database: 'Users',
    dialect: 'mysql'
  }
};
