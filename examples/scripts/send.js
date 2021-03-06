"use strict";
/**
 * Message publisher - Sender.
 *
 * @author Nicolas GIGOU <nicolas.gigou [at] gmail.com>
 * @date 30/05/2017
 * @see https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
 */

// Use constants to mutualise
const CONSTANTS = require('../utils/constants');
console.log("\nConstants: " + JSON.stringify(CONSTANTS, null, 4) + "\n");

// we need to require the library first
const AMQP = require('amqplib/callback_api');

// then connect to RabbitMQ server
AMQP.connect(CONSTANTS.CONNECT_TO, (err, conn) => {

    // Clean exit
    if(err){
        console.log("Err detected: " + err);
        process.exit(0);
    }

    console.log("Connected successfully!");

    // Next we create a channel, which is where most of the API for getting things done resides:
    conn.createChannel((err, channel) => {
        let msg = 'Hello World!';

        channel.assertQueue(CONSTANTS.QUEUE_NAME, {durable: false});
        channel.sendToQueue(CONSTANTS.QUEUE_NAME, new Buffer(msg));
        console.log("Sent %s", msg);
    });

    setTimeout(() => { conn.close(); process.exit(0); }, 500);
});