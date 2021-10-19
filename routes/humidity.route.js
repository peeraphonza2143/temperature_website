const express = require('express');

const humidityRoute = express.Router();

/* GET home page. */
humidityRoute.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = humidityRoute;
