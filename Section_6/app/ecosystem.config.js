const AMQP_CONNECTION_STRING =
  'amqp://omgayddm:S81BA5QPaZLfhSJvwbGxAvHpm79dBmS-@jellyfish.rmq.cloudamqp.com/omgayddm';
const AMQP_CHANNEL_NAME = 'PAYMENTS_GATEWAY';
const AMQP_QUEUE_NAME = 'PAYMENTS_QUEUE';

module.exports = {
  apps: [
    {
      name: 'plans-service',
      script: './plans-service/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MYSQL_USER: 'root',
        MYSQL_PASS: '123456789',
        MYSQL_HOST: 'localhost',
        MYSQL_PORT: 3307,
        MYSQL_DB: 'PlansDb',
        PORT: 3001
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'subscriptions-service',
      script: './subscriptions-service/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
        MYSQL_USER: 'root',
        MYSQL_PASS: '123456789',
        MYSQL_HOST: 'localhost',
        MYSQL_PORT: 3308,
        MYSQL_DB: 'SubscriptionsDb',
        PORT: 3002,
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'payments-service',
      script: './payments-service/index.js',
      watch: true,
      env: {
        AMQP_CONNECTION_STRING,
        AMQP_CHANNEL_NAME,
        AMQP_QUEUE_NAME
      }
    }
  ]
};
