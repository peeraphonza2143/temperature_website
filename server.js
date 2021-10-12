const express = require('express')
const mongoose = require('mongoose')

const humidityModel = require('./models/humidity')
const humidityRoute = require('./routes/humidity.route')

mongoose.connect('mongodb://localhost/humidity', {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected')
},
  error => {
    console.log('Database could not connected: ' + error)
  }
)

const app = express()

app.use(express.json());
app.use(express.static(__dirname));

app.get('/year', async (req, res) => {
  const rhYear = await humidityModel.find({ sensor: "1" })
  var summonth = 0
  var m1 = 0, m2 = 0, m3 = 0, m4 = 0, m5 = 0, m6 = 0, m7 = 0, m8 = 0, m9 = 0, m10 = 0, m11 = 0, m12 = 0
  var i = 1
  var sumday = 0
  for (index in rhYear) {
    var year = rhYear[index]['date']
    var month = year.split("/")[0]
    if (month == 1) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m1 = m1 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 2) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m2 = m2 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 3) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m3 = m3 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 4) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m4 = m4 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 5) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m5 = m5 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 6) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m6 = m6 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 7) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m7 = m7 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 8) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m8 = m8 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 9) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m9 = m9 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 10) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m10 = m10 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 11) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m11 = m11 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
    if (month == 12) {
      sumday = sumday + rhYear[index]['humid']
      if (i == 24) { m12 = m12 + sumday / 24; sumday = 0; i = 0 }
      i = i + 1
    }
  }
  console.log(i)
  var data = [{
    "jan": parseInt(m1 / 31), "feb": parseInt(m2 / 28), "mar": parseInt(m3 / 31), "apr": parseInt(m4 / 30),
    "may": parseInt(m5 / 31), "jun": parseInt(m6 / 30), "jul": parseInt(m7 / 31), "aug": parseInt(m8 / 31), "sep": parseInt(m9 / 30),
    "oct": parseInt(m10 / 31), "nov": parseInt(m11 / 30), "dec": parseInt(m12 / 31)
  }]
  res.json(data)
})

app.get('/day', async (req, res) => {
  var day = req.query.d
  var sensorid = req.query.s
  console.log(day)
  const rhDay = await humidityModel.find({ sensor: sensorid, date: day })
  console.log(rhDay.length)
  res.json(rhDay)
})

app.get('/month', async (req, res) => {
  var month = req.query.m
  var year = req.query.y
  console.log(month)
  console.log(year)
  var gmonth = "^" + month + "/" + ".*." + "/" + year
  console.log(gmonth)
  var rhMonth = await humidityModel.find({ sensor: "1", date: { $regex: gmonth } })
  var dayofmonth = rhMonth.length / 24
  var sumday = 0
  var sumweek = 0
  var day = 0
  var week = 0
  var countday = 0
  var dayofday = 0
  var i = 0
  var w1 = 0, w2 = 0, w3 = 0, w4 = 0

  for (index in rhMonth) {
    day = day + rhMonth[index]['humid']
    if ((parseInt(index) + 1) % 24 == 0) {
      sumday = sumday + day / 24
      dayofday = sumday
      day = 0
      countday = countday + 1
      if (countday == 7) {
        i = i + 1
        sumweek = sumweek + dayofday / 7
        if (i == 1) { w1 = parseInt(sumweek) }
        if (i == 2) { w2 = parseInt(sumweek) }
        if (i == 3) { w3 = parseInt(sumweek) }
        if (i == 4) { w4 = parseInt(sumweek) }
        sumweek = 0
        sumday = 0
        countday = 0
        dayofday = 0
      }
    }
  }
  var data = [{ "week1": w1, "week2": w2, "week3": w3, "week4": w4 }]
  res.json(data)
})

app.get('/', function (req, res) {
  res.render('index.html');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`)
})
