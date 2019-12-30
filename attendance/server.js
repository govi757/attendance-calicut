const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();
app.use(session({
    secret: 'attendance',
    resave: false,
    saveUninitialized: true
  }))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

const classRoute = require('./app/routes/attendance.route');

classRoute(app);

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(
    () => {
        console.log("Successfully connected to the database"); 
    }
).catch(err => {
    console.log("Error", err); 
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to attendance app"});
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});