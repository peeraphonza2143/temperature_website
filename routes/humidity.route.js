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
        var avgWeek1 = summery(week1, true)
        var avgWeek2 = summery(week2, true)
        var avgWeek3 = summery(week3, true)
        var avgWeek4 = summery(week4, true)
        var avgWeek5 = summery(week5, true)

        res.json([{avgWeek1, avgWeek2, avgWeek3, avgWeek4, avgWeek5}]);
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

        var month1 = [], month2 = [], month3 = [], month4 = [], month5 = [], month6 = [],
          month7 = [], month8 = [], month9 = [], month10 = [], month11 = [], month12 = []

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          var date = new Date(element.timestamp)

          switch (date.getMonth()) {
            case 0:
              month1.push(element.humidity)
              break;
            case 1:
              month2.push(element.humidity)
              break;
            case 2:
              month3.push(element.humidity)
              break;
            case 3:
              month4.push(element.humidity)
              break;
            case 4:
              month5.push(element.humidity)
              break;
            case 5:
              month6.push(element.humidity)
              break;
            case 6:
              month7.push(element.humidity)
              break;
            case 7:
              month8.push(element.humidity)
              break;
            case 8:
              month9.push(element.humidity)
              break;
            case 9:
              month10.push(element.humidity)
              break;
            case 10:
              month11.push(element.humidity)
              break;
            case 11:
              month12.push(element.humidity)
              break;
          }
        }

        res.json([{
          "jan": summery(month1, true),
          "feb": summery(month2, true),
          "mar": summery(month3, true),
          "apr": summery(month4, true),
          "may": summery(month5, true),
          "jun": summery(month6, true),
          "jul": summery(month7, true),
          "aug": summery(month8, true),
          "sep": summery(month9, true),
          "oct": summery(month10, true),
          "nov": summery(month11, true),
          "dec": summery(month12, true)
        }]);
      }
    })
  })
})

function summery(arr, aver = false) {
  var sum = 0
  for (let index = 0; index < arr.length; index++) {
    sum += arr[index];
  }
  if (aver) {
    return averange(sum, arr.length)
  } else {
    return sum
  }
}

function averange(num, length) {
  return num / length
}

// number return 2 digit
function prependZero(number) {
  if (number <= 9)
    return "0" + number;
  else
    return number;
}

module.exports = humidityRoute;
