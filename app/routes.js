var User = require('./models/user');
var Event = require('./models/event');
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    // get all users
app.get('/users', function(req, res) {

		// use mongoose to get all users in the database
		User.find(function(err, users) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(users); // return all todos in JSON format
		});
	});
app.post('/users', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		User.create({
			name : req.body.name,
			number : req.body.number
		}, function(err, user) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			User.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});

	});

// delete a user
	    app.delete('/users/:user_id', function(req, res) {
		User.remove({
			_id : req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			User.find(function(err, users) {
				if (err)
					res.send(err)
				res.json(users);
			});
		});
	});



app.get('/events', function(req, res) {

                // use mongoose to get all events in the database
                Event.find(function(err, events) {

                        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                        if (err)
                                res.send(err)

                        res.json(events); // return all events in JSON format
                });
        });
app.post('/events', function(req, res) {

                // create a event, information comes from AJAX request from Angular
                Event.create({
                        name : req.body.name,
			lat : req.body.lat,
			long : req.body.long,
			date : req.body.date,
			time : req.body.time,
			attendes : req.body.attendes
                }, function(err, event) {
                        if (err)
                                res.send(err);

                        // get and return all the todos after you create another
                        Event.find(function(err, events) {
                                if (err)
                                        res.send(err)
                                res.json(events);
                        });
                });

        });

// delete a event
            app.delete('/events/:event_id', function(req, res) {
                Event.remove({
                        _id : req.params.event_id
                }, function(err, event) {
                        if (err)
                                res.send(err);

                        // get and return all the todos after you create another
                        Event.find(function(err, events) {
                                if (err)
                                        res.send(err)
                                res.json(events);
                        });
                });
        });
    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
