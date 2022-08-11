var express = require('express');
var router = express.Router();
var request = require("request");

const session = require('express-session');
router.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
var cookieParser = require('cookie-parser');
router.use(cookieParser());

var commenti = require("./commenti");

var db = require("../db");

router.post('/commento/main', function(req, res, next) {
	const { articolo, messaggio, mail } = req.body;
	var commento = {
        _id: messaggio,
        email: mail,
        articolo: articolo
      };
      db.inserisciCommento(commento);
	  res.redirect('/news/main');
});

router.get('/commento/main', function(req, res, next) {
	res.redirect('/news/main');
});

router.get("/", function(req, res, next) {
	if (req.cookies.username) {
	  res.render('news', {user: req.cookies.username});
	}
	return res.render('index');
})

router.get("/main", function(req, expRes){
	if (req.cookies.username) {
    const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
                                   <a href="/news/main">Primo piano</a>
                                   <a href="/news/business">Business</a>
                                   <a href="/news/intrattenimento">Intrattenimento</a>
                                   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
	} else{
		return expRes.render('index');
	}

});

router.get("/business", function(req, expRes){
	if (req.cookies.username) {
	const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&category=business&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
								   <a href="/news/main">Primo piano</a>
								   <a href="/news/business">Business</a>
								   <a href="/news/intrattenimento">Intrattenimento</a>
								   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
							} else{
								return expRes.render('index');
							}
});

router.get("/intrattenimento", function(req, expRes){
	if (req.cookies.username) {
	const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&category=entertainment&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
								   <a href="/news/main">Primo piano</a>
								   <a href="/news/business">Business</a>
								   <a href="/news/intrattenimento">Intrattenimento</a>
								   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
							} else{
								return expRes.render('index');
							}
});

router.get("/salute", function(req, expRes){
	if (req.cookies.username) {
	const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&category=health&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
								   <a href="/news/main">Primo piano</a>
								   <a href="/news/business">Business</a>
								   <a href="/news/intrattenimento">Intrattenimento</a>
								   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
							} else{
								return expRes.render('index');
							}
});

router.get("/scienza", function(req, expRes){
	if (req.cookies.username) {
	const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&category=science&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
								   <a href="/news/main">Primo piano</a>
								   <a href="/news/business">Business</a>
								   <a href="/news/intrattenimento">Intrattenimento</a>
								   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
							} else{
								return expRes.render('index');
							}
});

router.get("/sport", function(req, expRes){
	if (req.cookies.username) {
	const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&category=sports&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
								   <a href="/news/main">Primo piano</a>
								   <a href="/news/business">Business</a>
								   <a href="/news/intrattenimento">Intrattenimento</a>
								   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
							} else{
								return expRes.render('index');
							}
});

router.get("/tecnologia", function(req, expRes){
	if (req.cookies.username) {
	const userAgent = req.get('user-agent');
	request({
		uri: "https://newsapi.org/v2/top-headlines?country=it&category=technology&apiKey=211f82d637df424e94163f662e894a01",
		method: 'GET',
        headers: {
            'User-Agent': userAgent
        }
	},
	  function(err,res,body){
	  	console.log(body);
	  	var data = JSON.parse(body);

	  		var finalResponse = `<style>
                                 body {
                                   margin:0;
                                   background-color: #f1f1f1;
                                 }
                                 p{
                                   margin:0;
                                 }
                                 #navbar {
                                   text-align:center;
                                   background-color: #d9b343;
                                   width: 100%;
                                   position: fixed;
                                 }
                                 #navbar a {
                                   color: #ffffff;
                                   text-align: center;
                                   padding: 0 20px;
                                   text-decoration: none;
                                   font-size: 140%;
                                 }
                                 #navbar a:hover {
                                   background-color: #0b5889;
                                   color: #ffffff;
                                 }
                                 #content {
                                   padding-top:30px;
                                   height:2000px;
                                 }
								 table thead th{
									background-color: #fceba7;
									color: #020801;
									table-layout:auto;
								 }
								 .active {
									background-color: #e6230e;
								}
                                 </style>
                                 </head>
                                 <body>
              
                                 <div id='navbar'>
								   <a class="active" href="/users/news">Day News</a>
								   <a href="/news/main">Primo piano</a>
								   <a href="/news/business">Business</a>
								   <a href="/news/intrattenimento">Intrattenimento</a>
								   <a href="/news/salute">Salute</a>
								   <a href="/news/scienza">Scienza</a>
								   <a href="/news/sport">Sport</a>
								   <a href="/news/tecnologia">Tecnologia</a>
								   <a class="active" href="/users/logout">Logout</a>
								   <a class="active" href="/commenti/lista_commenti">Accedi ai commenti</a>
                                 </div>
								 
								 <br>
								 <br>
								 <table>
	  							   <thead>
	  							     <th>
	  							       Anteprima
	  							     </th>
	  							     <th>
	  							       Titolo
	  							     </th>
	  							     <th>
	  							       Descrizione
	  							     </th>
	  							     <th>
	  							       News URL
	  							     </th>
	  							     <th>
	  							       Autore
	  							     </th>
	  							     <th>
	  							        Orario pubblicazione
	  							     </th>
	  							     <th>
	  							       Contenuto
	  							     </th>
									 <th>
									   Commento
									 </th>
								   </thead><tbody>`

								 data = data.articles;

								 for (var rec in data ) {
                                    console.log(data[rec])
								 	finalResponse += `
									                 <tr>
									                   <td align=center><img src="${data[rec].urlToImage}" style="width:200px;" /></td>
									                   <td align=center>${data[rec].title}</td>
									                   <td align=center>${data[rec].description}</td>
									                   <td align=center width = "50"><a href="${data[rec].url}" target="_blank">${data[rec].url}</a></td>
													   <td align=center>${data[rec].author}</td>
									                   <td align=center>${data[rec].publishedAt}</td>
									                   <td align=center>${data[rec].content}</td>
													   <td align=center><form name="invio_dati" action="/news/commento/main" method="post">
                                                             <p><input type="text" name="mail" value=${req.cookies.username} readonly size="50"></p><br>
                                                             <p><input type="text" name="articolo" value=${data[rec].url} readonly  size="50"></p><br>
                                                             <p><textarea name="messaggio" rows="5" cols="50" placeholder="inserisci un commento"></textarea></p><br>
                                                             <p><input name="invia" type="submit"></p>
                                                           </form> 
													   </td>
									                 </tr>`
 								 }

 								 finalResponse += `</tbody></table></body></html>`;
 								 expRes.send(finalResponse);
 								});
							} else{
								return expRes.render('index');
							}
});

module.exports = router;