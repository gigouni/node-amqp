"use strict";
/**
 * Script to allow arbitrary messages to be sent from the command line.
 * Message publisher through Work queue.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

// We need to require the library first
const AMQP = require('amqplib/callback_api');

// Then connect to RabbitMQ server
AMQP.connect(CONSTANTS.CONNECT_TO, (err, connection) => {

    // Clean exit
    if(err){
        console.log("Err detected: " + err);
        process.exit(0);
    }

    console.log("Connected successfully!");

    connection.createChannel((err, channel) => {
        let msg = process.argv.slice(2).join(' ') || "Hello World!";

        // The durable and persistent parameter to true mean that even if RabbitMQ server crash, the messages
        // won't be lost, they will be persistent
        // The name of the queue needs to be the same in the publisher and in the consumer to be sure that the
        // publisher feeds the correct queue
        channel.assertQueue(CONSTANTS.DURABLE_QUEUE_NAME, { durable: true });
        channel.sendToQueue(CONSTANTS.DURABLE_QUEUE_NAME, new Buffer(msg), { persistent: true });

        console.log(" [x] Sent '%s'", msg);
    });

    // If we're not able to connect to the RabbitMQ server, clean exit
    setTimeout(() => { connection.close(); process.exit(0); }, 1000);
});