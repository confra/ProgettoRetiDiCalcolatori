var express = require('express');
var router = express.Router();
const dotenv = require("dotenv");
const amqplib = require('amqplib/callback_api');

dotenv.config({ path: "../config/.env" });

var db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/news', function(req, res, next) {
  res.render('news');
});

//POST registrazione
router.post('/', function(req, res, next) {
  const { userreg, emailreg, pswreg } = req.body;
  db.getUtente(userreg)
    .then(function () {
      res.render("index", {
        title: "Registrazione",
        registered: true,
      });
    })
    .catch(function (err) {
      var utente = {
        _id: userreg,
        email: emailreg,
        password: pswreg
      };
      db.inserisciUtente(utente);
      res.render("news", {
        title: "Registrazione Effettuata",
        _id: userreg,
        email: emailreg
      });
    });
    amqplib.connect('amqp://guest:guest@rabbitmq', (err, connection) => {
    		if (err) {
        		console.error(err.stack);
    		}

    		connection.createChannel((err, channel) => {
        		if (err) {
            			console.error(err.stack);
        		}

			var queue = 'queue';
	
      			channel.assertQueue(queue, {
            		durable: true
        		}, err => {
            		if (err) {
              			console.error(err.stack);
      				}

            		let sender = (content) => {
                		let sent = channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)), {
                    		persistent: true,
                    		contentType: 'application/json'
                		});
            		};

            		let sent = 0;
            		let sendNext = () => {
               	 	if (sent >= 1) {
                    			console.log('All messages sent!');
                    			return channel.close(() => connection.close());
                		}
                		sent++;
                		sender({
                    			email: emailreg, username: userreg
                    		});
                    		return channel.close(() => connection.close());
            		};
            		sendNext();
        		});
    		});
	});
});

//GET login
router.get("/login/", function(req, res, next) {
  res.render('news');
})

//POST login
router.post("/login/", function (req, res, next) {
  db.getUtente(req.body.userreg)
    .then(function (user) {
      // controlla password
      res.redirect("/news");
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "Utente non registrato",
        notRegistered: true,
      });
    });
});

module.exports = router;