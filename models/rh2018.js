const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rhSchema = new Schema({
  date: String,
  time: String,
  humid: Number,
  sensor: String
},{collection:'rh2018'})

const rhModel = mongoose.model('rh2018', rhSchema)

module.exports = rhModel