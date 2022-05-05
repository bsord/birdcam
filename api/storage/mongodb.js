var mongoose = require('mongoose');

// Mongoose
exports.connect = () => {
  mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true});
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
