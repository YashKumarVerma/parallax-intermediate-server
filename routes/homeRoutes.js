/*
 * @router: To handle routes pointing to /api
 * @desc: to provide search / seek api for frontend
 */

require('dotenv').config();

// load express
const express = require('express');

// load logger
const logger = require('./../bin/logger/winston');

const db = require('./../bin/database/connect');

const Entry = require('./../bin/database/entry.schema');

// create instance of Router
const router = express.Router();

// route to /api. shows welcome message, and (maybe) other stuff too
router.get('/', (req, res) => {
  res.json({
    message: 'This series of routes handle all calls',
  });
});

// required params -> humidity, rain, pincode
router.get('/getData', (req, res) => {
  const payload = req.query;

  if (!req.query.humidity || !req.query.rain || !req.query.pincode) {
    return res.send('INCOMPLETE DATA');
  }

  //   set default value to zero
  if (!req.query.lat || !req.query.long) {
    req.query.lat = 0;
    req.query.long = 0;
  }

  //   create new object
  const entry = new Entry({
    pincode: req.query.pincode,
    lat: req.query.lat,
    long: req.query.long,
    humidity: req.query.humidity,
    raining: req.query.raining,
    time: Math.floor(new Date().getTime() / 1000),
  });

  entry.save((error) => {
    if (error) {
      logger.error(error.message);
      res.send('ERROR');
    } else {
      logger.info('New Item Saved to DB');
      res.send('SUCCESS');
    }
  });

  console.log(entry);
});

// export everything !
module.exports = router;
