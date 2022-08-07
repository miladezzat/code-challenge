const mongoose = require('mongoose');
const config = require('config');

const connectToDB = () => {
  mongoose.Promise = global.Promise;
  // mongoose.set('debug', config.get('MONGOOSE.DEBUG'));

  const uri = `mongodb://${config.get('DATABASE.HOST')}:${config.get('DATABASE.PORT')}/${config.get('DATABASE.NAME')}`;

  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: config.get('DATABASE.AUTO_INDEX'),
    family: 4,
    maxPoolSize: 5,
    minDHSize: 1,
  });
};

module.exports = connectToDB;
