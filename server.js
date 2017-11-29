var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var connections = [];
var posts = []
var postId = 0;

server.listen(process.env.PORT || 9000);

io.sockets.on("connection", function (socket) {
    console.log("Connected to Socket!!" + socket.id)
    connections.push(socket)
    socket.on('disconnect', function () {
        console.log('Disconnected - ' + socket.id);
    });

    socket.on('loadPost', function () {
        io.emit('loadPost', posts);
    });

    socket.on('addPost', function (post) {
        post.id = ++postId
        posts.push(post);
        io.emit('addPost', post);
    });

    socket.on('removePost', function (id) {
        posts = posts.filter(function (post) {
            return post.id !== id
        });
        io.emit('removePost', id);
    });
})