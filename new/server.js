var async = require('async'),
    net = require('net'),
    redis = require('redis'),
    redisClient = redis.createClient(),
    PORT = 1111;

var worker = "worker";

net.createServer(function(socket) {
    socket.on('data', function(data) {
        console.log("DATA: " + data.toString());
        var task = data.toString();

        redisClient.rpush(worker, task, function(err, result) {
            if(err) throw err;
        });
    });
    socket.on('end', function() {
        
    });
    socket.write('Welcome!');

}).listen(PORT);
