var express = require('express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var devicesRouter = require('./routes/devices');
var db = require('./storage/mongodb')
var app = express();
db.connect()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/devices', devicesRouter);

module.exports = app;
