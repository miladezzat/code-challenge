const config = require('config');
const moment = require('moment');
const mongoose = require('mongoose');
const connectToDB = require('./loaders/connect-to-db');
const app = require('./app');
const logger = require('./helpers/logger');

(async () => {
  try {
    await connectToDB();
    /**
     * Listen on provided port, on all network interfaces.
     */

    const appServer = app.listen(config.get('PORT'), async () => {
      logger.info('--------------------------------------------------------------');
      logger.info(`Timestamp: ${moment().toLocaleString()}`);
      logger.info('Protocol: HTTP');
      logger.info(`Environment: ${config.get('ENVIRONMENT')}`);
      logger.info(`Port: ${config.get('PORT')}`);
      logger.info('--------------------------------------------------------------');
    });

    // this function is called when you want the server to die gracefully
    // i.e. wait for existing connections
    const gracefulShutdown = () => {
      logger.info('Received kill signal, shutting down gracefully.');
      appServer.close(() => {
        logger.info('HTTP Server Closed');

        mongoose.connection.close(false, () => {
          logger.info('Mongoose connection closed.');
          process.exit(0);
        });
      });

      setTimeout(() => {
        logger.info('Could not close connections in time, forcefully shutting down');
        process.exit();
      }, 100);
    };

    // listen for TERM signal .e.g. kill
    process.on('SIGTERM', gracefulShutdown);

    // listen for INT signal e.g. Ctrl-C
    process.on('SIGINT', gracefulShutdown);

    // get the unhandled rejection and throw it to another fallback handler we already have.
    process.on('unhandledRejection', (error) => {
      throw error;
    });

    process.on('uncaughtException', (error) => {
      logger.error({}, 'uncaughtException', error);
      process.exit(1);
    });
  } catch (e) {
    logger.error({}, 'Error In The Server Loaders', e);
    process.exit(1);
  }
})();
