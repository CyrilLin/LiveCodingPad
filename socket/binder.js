var io = require('socket.io');
var logger = require('morgan');
var ot = require('ot');


function SocketBinder(server){
    this.init(server);
}

SocketBinder.prototype.init = function (server) {
    io = io.listen(server);
};

var editorServer = new ot.EditorSocketIOServer('welcome', [], 'demo', function (socket, cb) {
    cb(socket.mayEdit);
});

SocketBinder.prototype.bind = function () {
    io.on('connection', function (socket) {
        console.log("New Client connected...");
        socket.emit('welcome', {data: 'welcome!'});

        editorServer.addClient(socket);
        editorServer.setName(socket, socket.id);
        socket.mayEdit = true;

        socket.on('disconnect', function () {
           console.log('A Client disconnected...')
        });
    });
};

module.exports = SocketBinder;
