const mongoose = require('mongoose');

// define attributes for a track
const tokenStorage = new mongoose.Schema({
  pincode: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  raining: {
    type: Number,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('tokenStorage', tokenStorage);
