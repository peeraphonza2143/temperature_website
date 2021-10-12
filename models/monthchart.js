const mongoose = require('mongoose')
const Schema = mongoose.Schema

const daySchema = new Schema({
  date: String,
  time: String,
  humid: Number,
  sensor: String
},{collection:'rh2012'})

const dayModel = mongoose.model('rh2012', daySchema)

module.exports = dayModel
