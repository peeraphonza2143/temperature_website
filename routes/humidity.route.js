const humidityModel = require('../models/humidity');

const express = require('express');
const humidityRoute = express.Router();

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

  var weeek1 = []
  var weeek2 = []
  var weeek3 = []
  var weeek4 = []
  var weeek5 = []

  humidityModel.findOne({}, (error, dataOne) => {
    humidityModel.find({
      timestamp: {
        $gte: new Date(`${year}-${month}-01T00:00:00.000`),
        $lte: new Date(`${year}-${month + 1}-01T00:00:00.000`)
      }, sensor: dataOne.sensor
    }, (error, data) => {
      if (error) {
        next(error)
      } else {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          var datetime = new Date(element.timestamp);
          var date = datetime.getDate()

          if (date <= 7) {
            weeek1.push(element)
          } else if (date <= 14) {
            weeek2.push(element)
          } else if (date <= 21) {
            weeek3.push(element)
          } else if (date <= 28) {
            weeek4.push(element)
          } else {
            weeek5.push(element)
          }
        }
        res.json([weeek1, weeek2, weeek3, weeek4, weeek5]);
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
