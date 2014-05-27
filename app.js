// Including libraries
var express = require('express');
var app = express(),
	server = app.listen('8080'),
	io = require('socket.io').listen(server),
	static = require('node-static'); // for serving files

//var app = express();
// This will make all the files in the current folder
// accessible from the web
// var fileServer = new static.Server('./');
	
// This is the port for our web server.
// you will need to go to http://localhost:8080 to see it
// app.listen(8080);


app.engine('html', require('ejs').renderFile);


app.get('/', function(req, res){
	res.render('../index.html')
});
app.use("/assets", express.static(__dirname + '/assets'));


// If the URL of the socket server is opened in a browser
function handler (request, response) {

	request.addListener('end', function () {
        fileServer.serve(request, response);
    });
}

// Delete this row if you want to see debug messages
// io.set('log level', 1);

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

	// Start listening for mouse move events
	socket.on('mousemove', function (data) {
		
		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);
	});
});