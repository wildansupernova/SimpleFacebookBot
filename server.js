const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const Messages = require('./data/messageData');
const messageData = new Messages();
//Dotenv
require('dotenv').config()

if (process.env.NODE_ENV == 'TEST_ENV') {
    process.env.VERIFY_TOKEN = 'TEST_ENV';
}

// app configuration
app.set('port', (process.env.PORT || 3000));
// setup our express application
app.use(morgan('dev')); // log every request to the console.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app routes
require('./routes/webhook')(app, messageData);
require('./routes/messages')(app, messageData);

app.get('/', function (req, res) {
    res.send("Hello World!!!")
});

//Set App localhost
module.exports = app.listen(app.get('port'), function () {
    const url = 'http://localhost:' + app.set('port');
    console.log('Application running on port: ', app.get('port'));
});