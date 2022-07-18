var request = require("request");
var express = require('express');
var router = express.Router();
const username = "admin";
const password = "123456";

//id libro sarà il titolo della notizia
//testo, sarà il testo del commento 
//user sarà l'email dell utente che ha scritto il messaggio
router.get("/lista_commenti",function(req, res){
      var options ={
          url:'http://'+username+":"+password+"@couchdb:5984/commenti/_design/all/_view/_view"
      }
      request.get(options, async function callback(error,response,body){
          var info = JSON.parse(body);
          console.log(info);
          res.render('listacommenti',{file:body});
      })
    }
)

module.exports = router;
