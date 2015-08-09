var restify = require('restify');
var server = require('./server');
 
var client = restify.createJsonClient({
    url: 'http://localhost:3000'
});
 
// a static product to CREATE READ UPDATE DELETE
 
var testProduct = {
    id: "1",
    name: "Apple iPad AIR",
    lat: "iOS 7, upgradable to iOS 7.1",
    lang: "Apple A7",
    date: "Dual-core 1.3 GHz Cyclone (ARM v8-based)",
    time: "PowerVR G6430 (quad-core graphics)",
    attendes: "Accelerometer, gyro, compass",
};
 
client.post('/event', testProduct, function (err, req, res, event) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(event);
    }
});

client.get('/event/' + testProduct.id, function (err, req, res, event) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product with id ' + event.id + '  >>>>>>>');
        console.log(event);
    }
});

client.get('/events', function (err, req, res, events) {
	if (err) {
	    console.log("An error ocurred >>>>>>");
	    console.log(err);
	} else {
	    console.log("Total products " + events.length);
	    console.log('All products >>>>>>>');
	    console.log(events);
	}
});

testProduct.lang = "1000 USD",
client.put('/event/' + testProduct.id, testProduct, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product saved >>>>>>>');
        console.log(status);
    }
 
});

client.del('/event/' + testProduct.id, function (err, req, res, status) {
    if (err) {
        console.log("An error ocurred >>>>>>");
        console.log(err);
    } else {
        console.log('Product deleted >>>>>>>');
        console.log(status);
    }
});
