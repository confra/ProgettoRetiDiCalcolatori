var passport = require('passport');
const dotenv = require("dotenv");
const amqplib = require('amqplib/callback_api');

var db = require("./db");
var calendar = require("./calendar");

dotenv.config({ path: "./config/.env" })

const { google } = require('googleapis');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://localhost:443/google/callback",
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  db.getUtente(profile.displayName.toLowerCase().replaceAll(" ", "."))
      .then(function (user) {
          console.log("utente già inserito nel db");
          calendar.newEvent(refreshToken);
      })
      .catch(function (err) {
        var utente = {
          _id: profile.displayName.toLowerCase().replaceAll(" ", "."),
          email: profile._json.email,
          logged_with: 'google',
        };
        db.inserisciUtente(utente);
        calendar.newEvent(refreshToken);
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
                        email: profile._json.email, username: profile.displayName.toLowerCase().replaceAll(" ", ".")
                      });
                      return channel.close(() => connection.close());
              };
              sendNext();
          });
      });
  });
      });
    return done(null, profile);
}
));