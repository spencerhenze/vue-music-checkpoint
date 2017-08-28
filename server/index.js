var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')
var sessions = require('./auth/session')
var database = require('./config/dbconfig')

// SERVER INSTANCE
var server = express()
var port = process.env.PORT || 3000;
server.use(express.static(__dirname + '/../public/dist'));

server.listen(port, () => {
    console.log('Listening on port: ' + port)
})

// MIDDLEWEAR
server.use(cors())
server.use(sessions);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

// ROUTES

var authRouter = require('./auth/auth-routes');
server.use('/', authRouter);

var myTunesRouter = require('./routes/mytunes-routes');
server.use('/api/mytunes/', myTunesRouter);



