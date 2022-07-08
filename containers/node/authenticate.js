var passport = require('passport');
const dotenv = require("dotenv");

var db = require("./db");

dotenv.config({ path: "./config/.env" })

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
    callbackURL: "http://localhost:80/google/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    db.getUtente(profile.displayName.toLowerCase().replaceAll(" ", "."))
        .then(function (user) {
            console.log("utente già inserito nel db");
        })
        .catch(function (err) {
          var utente = {
            _id: profile.displayName.toLowerCase().replaceAll(" ", "."),
            email: profile._json.email,
            logged_with: 'google',
          };
          db.inserisciUtente(utente);
        });
      return done(null, profile);
}
));