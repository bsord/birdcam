var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  image: String,
  video: String,
  date: Date,
  message: String,
});

module.exports = mongoose.models.event || mongoose.model('event', EventSchema );
