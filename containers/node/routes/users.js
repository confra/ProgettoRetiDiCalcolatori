var express = require('express');
var router = express.Router();
const dotenv = require("dotenv");

dotenv.config({ path: "../config/.env" });

var db = require("../db");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/newspaper', function(req, res, next) {
  res.render('newspaper');
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
      res.render("newspaper", {
        title: "Registrazione Effettuata",
        _id: userreg,
        email: emailreg
      });
    });
});

//GET login
router.get("/login/", function(req, res, next) {
  res.render('newspaper');
})

//POST login
router.post("/login/", function (req, res, next) {
  db.getUtente(req.body.userreg)
    .then(function (user) {
      // controlla password
      res.redirect("/newspaper");
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