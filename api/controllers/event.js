// EVENTS CONTROLLER
let Events = require('../models/event');

exports.create = (event) => {
  return Events.create(event)
};

exports.read = (query) => {
	return Events.find(query)
};

exports.update = (query, event) => {
  return Events.findOneAndUpdate(query, event, {upsert: true})
};

exports.delete = (query) => {
  return Events.deleteOne(query)
}