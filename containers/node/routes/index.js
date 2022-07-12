var express = require('express');
var router = express.Router();

const session = require('express-session');
router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
var cookieParser = require('cookie-parser');
router.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/news', function(req, res, next) {
  if (req.cookies.username) {
    return res.render('news');
  }
  return res.render('index');
});

module.exports = router;
