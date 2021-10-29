const express = require('express');
const humidityModel = require('../models/humidity');

const humidityRoute = express.Router();

humidityRoute.route('/api').get((req, res, next) => {
  var today = new Date(); // Date right now
  var date = today.getFullYear() + '-' + prependZero((today.getMonth() + 1)) + '-' + prependZero(today.getDate()); // 2021-10-10  

  humidityModel.find({
    time_stamp: {
      $gt: new Date(`${date}T00:00:00.625z`),
      $lte: new Date(`${date}T23:55:00.625z`)
    }, sensor_id: reqSensor ? reqSensor : 1
  }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data);
      res.json(data)
    }
  })
})

humidityRoute.route('/api/realtime').get((req, res, next) => {
  var today = new Date();
  var date = today.getFullYear() + '-' + prependZero((today.getMonth() + 1)) + '-' + prependZero(today.getDate()); // 2021-10-10  

  humidityModel.findOne((error, data) => {
    humidityModel.find({
      timestamp: {
        $gte: new Date(`${date}T00:00:00.000`),
        $lte: new Date(`${date}T23:00:00.000`),
      }, sensor: data.sensor
    }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })
})

humidityRoute.route('/api/week').get((req, res, next) => {
  var dateCon = new Date()
  var month = dateCon.getMonth() + 1
  var year = dateCon.getFullYear()

  humidityModel.findOne({}, (error, data) => {
    humidityModel.find({
      timestamp: {
        $gte: new Date(`${year}-${month}-01T00:00:00.000`),
        $lte: new Date(`${year}-${month + 1}-01T00:00:00.000`)
      }, sensor: data.sensor
    }, (error, data) => {
      if (error) {
        next(error)
      } else {
        res.json({ data });
      }
    })
  })
})

humidityRoute.route('/api/year').get((req, res, next) => {
  humidityModel.find({})
})

// number return 2 digit
function prependZero(number) {
  if (number <= 9)
    return "0" + number;
  else
    return number;
}

module.exports = humidityRoute;
