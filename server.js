/*
 * Server main 
 */

//Load version
var appinfo = require('./package.json');
console.log(appinfo.name + " " + appinfo.version);

// Load express and socket.io.
var express = require('express.io'),
    app = express(),
    path = require('path')

app.http().io();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/vendor', express.static(__dirname + '/bower_components/'));

app.io.on('connection', function(socket) {
    console.log('User ' + socket.id + ' connected');
    socket.emit("app_version", {
        version: appinfo.version
    })
    socket.on('disconnect', function() {
        console.log('User ' + socket.id + ' disconnected');
    });
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
    console.log('HTTP server listening on port ' + app.get('port'));
});