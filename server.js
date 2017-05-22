"use strict";

let amqp = require('amqp');

let connection = amqp.createConnection(
    {
        host: 'localhost'
        , port: 5672
        , login: 'guest'
        , password: 'guest'
        , connectionTimeout: 10000
        , authMechanism: 'AMQPLAIN'
        , vhost: '/'
        , noDelay: true
        , ssl: { enabled : false
    }
});

// add this for better debuging
connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

// Wait for connection to become established.
connection.on('ready', function () {
    console.log("It's ready");
    // Use the default 'amq.topic' exchange
    connection.queue('my-queue', function (q) {
        // Catch all messages
        q.bind('#');

        // Receive messages
        q.subscribe(function (message) {
            // Print messages to stdout
            console.log(message);
        });
    });
});
