var express = require('express');
var router = express.Router();
const dotenv = require("dotenv");
const amqplib = require('amqplib/callback_api');

const session = require('express-session');
router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
var cookieParser = require('cookie-parser');
router.use(cookieParser());

dotenv.config({ path: "../config/.env" });

var db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.cookies.username) {
    return res.send('respond with a resource');
  }
  return res.render('index');
});

router.get('/news', function(req, res, next) {
  if (req.cookies.username) {
    res.render('news', {user: req.cookies.username});
  }
  return res.render('index');
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
  if (req.cookies.username) {
    res.render('news', {user: req.cookies.username});
  }
  return res.render('index');
})

//POST login
router.post("/login/", function (req, res, next) {
  db.getUtente(req.body.userreg)
    .then(function (user) {
      // controlla password
      res.cookie("username", user._id);
      res.render('news', {user: req.cookies.username});
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "Utente non registrato",
        notRegistered: true,
      });
    });
});

/* GET logout. */
router.get("/logout/", function (req, res, next) {
  res.clearCookie("username");
  res.redirect("/");
});

module.exports = router;