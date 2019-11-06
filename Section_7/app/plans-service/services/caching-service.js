const redis = require('redis');
const promisify = require('util').promisify;

module.exports = class CachingService {
  constructor(redisConfig) {
    this.plansKey = 'plans';
    this.redisHost = redisConfig.host;
    this.redisPort = redisConfig.port;
    this.redisPassword = redisConfig.password;
    this.redisClient = redis.createClient({
      host: this.redisHost,
      port: this.redisPort,
      auth_pass: this.redisPassword
    });
  }

  async getPlans(userId) {
    let plans = await promisify(this.redisClient.hget).bind(this.redisClient)(
      getUserKey(userId),
      this.plansKey
    );

    return plans ? JSON.parse(plans) : null;
  }

  purgeCache(userId) {
    if (!userId) {
      return Promise.resolve();
    }
    return promisify(this.redisClient.expire).bind(this.redisClient)(
      getUserKey(userId),
      0
    );
  }

  async storePlans(userId, plans) {
    plans = plans || [];
    await this.purgeCache(userId);
    await promisify(this.redisClient.hset).bind(this.redisClient)(
      getUserKey(userId),
      this.plansKey,
      JSON.stringify(plans)
    );
  }
};

function getUserKey(userId) {
  return `user#${userId}`;
}
