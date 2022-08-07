module.exports = {
  ENVIRONMENT: 'development',
  PORT: process.env.PORT || 8080,
  DATABASE: {
    DEBUG: true,
    AUTO_INDEX: true,
    USERNAME: process.env.MONGO_USERNAME,
    PASSWORD: process.env.MONGO_PASSWORD,
    NAME: process.env.MONGO_DATA_BASE_NAME || 'kib_task',
    PORT: process.env.MONGO_PORT || 27017,
    HOST: process.env.MONGO_HOST || 'localhost',
  },
  swagger: {
    explorer: false,
    swaggerOptions: {
      filter: true,
      tagsSorter: (tagOne, tagTwo) => (tagOne < tagTwo ? -1 : 1),
    },
  },
};
