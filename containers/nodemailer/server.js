//subscriber
'use strict';

const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	    user: 'daynews1990@gmail.com',
	    pass: 'optm fhum lkrx iwbk'
	}
});

transport.verify((error, success) => {
	if (error) {
    		console.error(error);
    	} 
    	else {
    		console.log('Pronto ad inviare email!');
	}
})

amqplib.connect('amqp://guest:guest@rabbitmq', (err, connection) => {
    if (err) {
        console.error(err.stack);
        return process.exit(1);
    }
    connection.createChannel((err, channel) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }
        
        var queue = 'queue';

        channel.assertQueue(queue, {
            durable: true
        }, err => {
            if (err) {
                console.error(err.stack);
                return process.exit(1);
            }

            channel.prefetch(1);

            channel.consume(queue, data => {
                if (data === null) {
                    return;
                }

                let message = JSON.parse(data.content.toString());
                
                let email = message.email;
                let username = message.username;
                
                var mailOptions = {
                	from: 'daynews1990@gmail.com',
                	to: email,
                	text: 'Benvenuto/a ' + username + ' ti sei registrato nel nostro sito web Day News! Accedi al tuo account per rimanere sempre sintonizzato con le notizie giornaliere in Italia'
                }

                transport.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err.stack);
                        return channel.nack(data);
                    }
                    channel.ack(data);
                }); 
            }, { noAck: false });
        });
    });
});