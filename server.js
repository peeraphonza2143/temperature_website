const express = require('express')
const app = express()
var mongoose = require('mongoose')
const Schema = mongoose.Schema
const path = require('path')
const tempDSchema = new Schema({
  date: String,
  time: String,
  sensor_id: Number,
  humidity_1: Number
},{
	collection:'tempD'
})

const tempWSchema = new Schema({
  week: String,
  sensor_id: Number,
  humidity_2: Number
},{
	collection:'tempW'
})

const tempMSchema = new Schema({
  month: String,
  sensor_id: Number,
  humidity_3: Number
},{
	collection:'tempM'
})

const tempD = mongoose.model('tempD',tempDSchema)
const tempW = mongoose.model('tempW',tempWSchema)
const tempM = mongoose.model('tempM',tempMSchema)

mongoose.connect('mongodb://localhost/tempdb',{
	useNewUrlParser: true
})
var db = mongoose.connection;

const tempDs = [
	{
		date: '01/09/2021',
		time: '11.15',
		sensor_id : '1',
		humidity_1: '50'
	}
]

app.use(express.json())

app.get('/mainchart',async (req, res) => {
  const tempDs = await tempD.find({})
  res.json(tempDs)
})

app.get('/subchart1',async (req, res) => {
  const tempWs = await tempW.find({})
  res.json(tempWs)
})

app.get('/subchart2',async (req, res) => {
   const tempMs = await tempM.find({})
   res.json(tempMs)
})

db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(3000, () => {
  console.log('Application is running on port 9000')
})
