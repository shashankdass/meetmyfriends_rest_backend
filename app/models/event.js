var mongoose = require('mongoose');

module.exports = mongoose.model('Event', {
        id : String,
        name : String,
        lat : String,
	long : String,
	date : String,
	time : String,
	attendees : String
    });
