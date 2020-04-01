// All imports needed here
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Importing the model
const studentModel = require('./models/student');

// Creates the express application
const app = express();
const port = 9090;

// Creates an engine called "hbs" using the express-handlebars package.
app.engine( 'hbs', exphbs({
  extname: 'hbs',
  defaultView: 'main',
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views/partials'),
}));

// Setting the view engine to the express-handlebars engine we created
app.set('view engine', 'hbs');

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// serve static files
app.use(express.static('public'));

//routers
const studentRouter = require('./routes/studentRoutes');

//mongoDB Database
const databaseURL = 'mongodb://localhost:27017/studentsdb';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

// Listening to the port provided
app.listen(port, function() {
  console.log('App listening at port '  + port)
});

// Home route
app.get('/', function(req, res) {
  res.render('home', { title: 'Home' });
});

app.use('/students', studentRouter);