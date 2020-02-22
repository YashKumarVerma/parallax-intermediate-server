require('dotenv').config();

// load express
const express = require('express');

// load bodyparser to parse post bosy
const bodyparser = require('body-parser');

// load logger for easy debug
const logger = require('./bin/logger/winston');

// create instance of express
const app = express();

// define port to start server on
const port = process.env.PORT || 3000;

// connect to databse
const database = require('./bin/database/connect');

// load routes for various handles
const apiRoutes = require('./routes/apiRoutes');

// parse valid requests only
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);

app.use(bodyparser.json());

// bind routes to application
app.use('/api', apiRoutes);

// start listening on ports
app.listen(port, () => {
  logger.info(`Express server started at port: ${port}`);
});
