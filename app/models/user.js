var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
        id : String,
	name : String,
        number : String
    }); 

