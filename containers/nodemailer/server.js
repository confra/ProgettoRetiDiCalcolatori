//subscriber
'use strict';

const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

//impostazione Nodemailer transport
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

//connessione al server AMQP
amqplib.connect('amqp://guest:guest@rabbitmq', (err, connection) => {
    if (err) {
        console.error(err.stack);
        return process.exit(1);
    }

    //creazione del canale relativo alla connessione
    connection.createChannel((err, channel) => {
        if (err) {
            console.error(err.stack);
            return process.exit(1);
        }
        
        var queue = 'queue';

        //assicura  la coda per i messaggi
        channel.assertQueue(queue, {
            //assicura che la coda non venga eliminata durante il restart del server 
            durable: true
        }, err => {
            if (err) {
                console.error(err.stack);
                return process.exit(1);
            }

            //indica quanti messaggi vogliamo processare in parallelo
            channel.prefetch(1);

            //funzione di callback per gestire i messaggi ricevuti dalla coda 
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
                    subject: 'Benvenuto su Day News',
                    text: 'Hello to myself!',
                    html: '<h1>Benvenuto/a ' + username +'</h1>'+ "<br><p1>Ti sei registrato al nostro sito web Day News! <br> Accedi al tuo account per rimanere sempre sintonizzato con le notizie giornaliere dall'Italia. </p1>"
                }

                //invio del messaggio usando la precedente configurazione di Nodemailer trasport
                transport.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error(err.stack);
                        //rimette il messaggio andato fallito durante l'invio nella coda
                        return channel.nack(data);
                    }
                    //rimuove il messaggio dalla coda
                    channel.ack(data);
                }); 
            }, { noAck: false });
        });
    });
});