const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Humidity = new Schema({
  date: Date,
  humidity: Number,
  sensor: String
}, { collection: 'hunidity' })

module.exports = mongoose.model('Humidity', Humidity)
