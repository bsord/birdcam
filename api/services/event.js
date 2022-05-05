// EVENTS SERVICE
// Business Logic for events

let EventsCntlr = require('../controllers/event');

exports.createEvent = (req, res) => {
  
  //build eventData
  console.log(req.body)
  eventData = {
    image: req.files['image'][0].location,
    video: req.files['video'][0].location,
    date: Date.now(),
    message: req.body.text
  }

  EventsCntlr.create(eventData)
    .then(event=>{
      res.json(event)
    }).catch(err => {
      console.log(err)
      res.status(500).send(err.errors);
    })
};

exports.readEvents = (req, res) => {
  //todo: add query support
	EventsCntlr.read({})
    .then(events=>{
      res.json(events)
    }).catch(err => {
      res.status(500).send(err.errors);
    })
};

exports.updateEvents = (req, res) => {
  //todo: get eventid from path and event data from req.body
  EventsCntlr.update({}, {})
    .then(events=>{
      res.json(events)
    }).catch(err => {
      res.status(500).send(err.errors);
    })
};

exports.deleteEvents = (req, res) => {
  //todo: get eventid from path
  EventsCntlr.update({})
    .then(events=>{
      res.json(events)
    }).catch(err => {
      res.status(500).send(err.errors);
    })
}