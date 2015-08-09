var restify = require('restify');
var mongojs = require('mongojs');
var server = restify.createServer();
var database = require('./config/database');
var db = mongojs(database.url, ['products']); 
var user_db = mongojs(database.url, ['users']);
var event_db = mongojs(database.url, ['events']);

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.listen(3000, function () {
    console.log("Server started @ 3000");
});

server.get('/user/:id', function (req, res, next) {
    user_db.users.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.get("/users", function (req, res, next) {
    user_db.users.find(function (err, users) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(users));
    });
    return next();
});

server.post('/user', function (req, res, next) {
    var user = req.params;
    user_db.users.save(user,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});
server.put('/user/:id', function (req, res, next) {
    // get the existing product
    user_db.users.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/product with the server/product
 
        var updUser = {}; // updated products 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updUser[n] = data[n];
        }
        for (var n in req.params) {
            updUser[n] = req.params[n];
        }
        user_db.users.update({
            id: req.params.id
        }, updUser, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/user/:id', function (req, res, next) {
    user_db.products.remove({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

server.get('/event/:id', function (req, res, next) {
    event_db.events.findOne({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(data));
    });
    return next();
});

server.get("/events", function (req, res, next) {
    event_db.events.find(function (err, events) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(events));
    });
    return next();
});

server.post('/event', function (req, res, next) {
    var event = req.params;
    event_db.events.save(event,
        function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    return next();
});
server.put('/event/:id', function (req, res, next) {
    // get the existing product
    event_db.events.findOne({
        id: req.params.id
    }, function (err, data) {
        // merge req.params/product with the server/product
 
        var updevent = {}; // updated products 
        // logic similar to jQuery.extend(); to merge 2 objects.
        for (var n in data) {
            updevent[n] = data[n];
        }
        for (var n in req.params) {
            updevent[n] = req.params[n];
        }
        event_db.events.update({
            id: req.params.id
        }, updevent, {
            multi: false
        }, function (err, data) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
        });
    });
    return next();
});

server.del('/event/:id', function (req, res, next) {
    event_db.products.remove({
        id: req.params.id
    }, function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify(true));
    });
    return next();
});

server.listen(3002, function () {
    require('./document')(server.router.mounts, 'restify');
});
module.exports = server;
