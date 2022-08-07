module.exports = {
  ENVIRONMENT: 'production',
  PORT: process.env.PORT || 443,
  DATABASE: {
    DEBUG: false,
    AUTO_INDEX: false,
    USERNAME: process.env.MONGO_USERNAME,
    PASSWORD: process.env.MONGO_PASSWORD,
    NAME: process.env.MONGO_DATA_BASE_NAME,
    PORT: process.env.MONGO_PORT,
    HOST: process.env.MONGO_HOST,
  },
};
