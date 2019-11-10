const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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