let express = require('express'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   dbConfig = require('./database/db');

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
   console.log('Database sucessfully connected')
},
   error => {
      console.log('Database could not connected: ' + error)
   }
)

const humidityRoute = require('./routes/humidity.route')
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/', humidityRoute);
app.use('/api', humidityRoute);

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log('Connected to port ' + port)
})