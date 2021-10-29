const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Humidity = new Schema({
  timestamp: Date,
  humidity: Number,
  sensor: String
}, { collection: 'humidityCol' })

module.exports = mongoose.model('Humidity', Humidity)
