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

  var week1 = []
  var week2 = []
  var week3 = []
  var week4 = []
  var week5 = []

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
            week1.push(element.humidity)
          } else if (date <= 14) {
            week2.push(element.humidity)
          } else if (date <= 21) {
            week3.push(element.humidity)
          } else if (date <= 28) {
            week4.push(element.humidity)
          } else {
            week5.push(element.humidity)
          }
        }

        var sumWeek1 = 0;
        for (var i = 0; i < week1.length; i++) {
          sumWeek1 += week1[i]
        }
        var avgWeek1 = sumWeek1 / week1.length;

        var sumWeek2 = 0;
        for (var i = 0; i < week2.length; i++) {
          sumWeek2 += week2[i]
        }
        var avgWeek2 = sumWeek2 / week2.length;

        var sumWeek3 = 0;
        for (var i = 0; i < week3.length; i++) {
          sumWeek3 += week3[i]
        }
        var avgWeek3 = sumWeek3 / week3.length;

        var sumWeek4 = 0;
        for (var i = 0; i < week4.length; i++) {
          sumWeek4 += week4[i]
        }
        var avgWeek4 = sumWeek4 / week4.length;

        var sumWeek5 = 0;
        for (var i = 0; i < week5.length; i++) {
          sumWeek5 += week5[i]
        }
        var avgWeek5 = sumWeek5 / week5.length;

        res.json([avgWeek1, avgWeek2, avgWeek3, avgWeek4, avgWeek5]);
      }
    })
  })
})

humidityRoute.route('/api/year').get((req, res, next) => {


  var dateCon = new Date()
  var year = dateCon.getFullYear()
  humidityModel.findOne((error, dataOne) => {
    humidityModel.find({
      timestamp: {
        $gte: new Date(`${year}-01-01T00:00:00.000`),
        $lte: new Date(`${year}-12-31T23:00:00.000`)
      }, sensor: dataOne.sensor
    }, (error, data) => {
      if (error) {
        next(error)
      } else {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          console.log(element);
        }
        res.json(data);
      }
    })
  })
})

// number return 2 digit
function prependZero(number) {
  if (number <= 9)
    return "0" + number;
  else
    return number;
}

module.exports = humidityRoute;
