const express = require('express');
const humidityModel = require('../models/humidity');

const humidityRoute = express.Router();


humidityRoute.get('/', function(req, res) {
  res.send('Hello World');
});

humidityRoute.route('/api').get((req, res, next) => {
  humidityModel.findOne((error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data);
      res.json(data)
    }
  })
})

module.exports = humidityRoute;
