var express = require('express');
var router = express.Router();
var eventService = require('../services/event')
var s3 = require('../storage/s3')

router.post('/', s3.upload, eventService.createEvent) //this uploads files posted to the endpoint, then passes fields to event service.
router.get('/', eventService.readEvents)
router.put('/', eventService.updateEvents)
router.delete('/', eventService.deleteEvents)

module.exports = router;
