const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rhSchema = new Schema({
  date: String,
  time: String,
  humid: Number,
  sensor: String
},{collection:'rh2015'})

const rhModel = mongoose.model('rh2015', rhSchema)

module.exports = rhModel	