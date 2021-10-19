const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rhSchema = new Schema({
  date: String,
  time: String,
  humid: Number,
  sensor: String
},{collection:'rh2012'})

const rhModel = mongoose.model('rh2012', rhSchema)

module.exports = rhModel
