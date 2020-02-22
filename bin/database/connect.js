// load configurations
require('dotenv').config();

// load mongoose wrapper
const mongoose = require('mongoose');
const logger = require('./../logger/winston');

// define an instance of database
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() => {
        logger.info('Database Connected');
      })
      .catch((err) => {
        logger.error('Database connection error');
        logger.error(err);
      });
  }
}

// pass instance of database
module.exports = new Database();
