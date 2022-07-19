var passport = require('passport');
const dotenv = require("dotenv");
const amqplib = require('amqplib/callback_api');

var db = require("./db");

dotenv.config({ path: "./config/.env" })
dotenv.config({ path: "./config/oauth.env" });

const { google } = require('googleapis');
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version: "v3"});

var GoogleStrategy = require('passport-google-oauth20').Strategy;

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
)

// Get date-time string for calender
const dateTimeForCalander = () => {

  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
      month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
      day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
      hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
      minute = `0${minute}`;
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 1
  let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

  return {
      'start': startDate,
      'end': endDate
  }
};

const insertEvent = async (event) => {

  try {
      let response = await calendar.events.insert({
          auth: auth,
          calendarId: calendarId,
          resource: event
      });
  
      if (response['status'] == 200 && response['statusText'] === 'OK') {
          return 1;
      } else {
          return 0;
      }
  } catch (error) {
      console.log(`Error at insertEvent --> ${error}`);
      return 0;
  }
};

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

          let dateTime = dateTimeForCalander();

                         // Event for Google Calendar
                         let event = {
                           'summary': `Accesso a Day News`,
                           'description': `Aggiornamento giornaliero sulle news in Italia`,
                           'start': {
                             'dateTime': dateTime['start'],
                             'timeZone': 'Europe/Rome'
                           },
                           'end': {
                             'dateTime': dateTime['end'],
                             'timeZone': 'Europe/Rome'
                           }
                         };
                         
                         insertEvent(event)
                           .then((res) => {
                           console.log(res);
                           })
                           .catch((err) => {
                           console.log(err);
                         });
      })
      .catch(function (err) {
        var utente = {
          _id: profile.displayName.toLowerCase().replaceAll(" ", "."),
          email: profile._json.email,
          logged_with: 'google',
        };
        db.inserisciUtente(utente);
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