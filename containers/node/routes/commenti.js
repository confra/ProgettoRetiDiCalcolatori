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
          res.send(body);
      })
    }
)

router.get("/lista_commenti/:user",function(req, res){
    var us = req.params.user;
    var options ={
        url:'http://'+username+":"+password+"@couchdb:5984/commenti/_design/all/_view/_view"
    }
    request.get(options, async function callback(error,response,body){
        var info = JSON.parse(body);
        var arr=[];
        for(i=0;i<info.total_rows;i++){
            if(info.rows[i].value[0] === us){
                ok = {
                    use:  info.rows[i].value[0],
                    notizia : info.rows[i].value[1],
                    messaggio : info.rows[i].value[2],
                  }
                arr.push(ok) 
            }
        }
        res.send(arr)
    })
  }
)

module.exports = router;
