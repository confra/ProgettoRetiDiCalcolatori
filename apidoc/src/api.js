/**@api {get} /commenti/lista_commenti Richiesta commenti totali degli utenti 
 * @apiName Commenti totali
 * @apiGroup Commenti
 *
 * @apiParamExample {text} Esempio-Richiesta:
 *      https://localhost/commenti/lista_commenti
 * @apiSuccess {Number} Numero delle righe
 * @apiSuccess {String} offset
 * @apiSuccess {Array} Array contenente l'username dell'utente, il commento e la relativa notizia
 * 
 * 
 *
 * @apiSuccessExample Success-Response:
 *     {
 *       "total_rows": 5,
 *       "offset": 0,
 *       "rows": [
 *         {
 *           "id": "esattamente",
 *           "ley": "esattamente",
 *           "value": [
 *             "ale",
 *             "https://www.liberoquotidiano.it/news/italia/32442748/meteo-mario-tozzi-sta-per-iniziare-era-del-fuoco-terribile-profezia.html",
 *             "esattamente"
 *           ]
 *         },
 *     {
 *           "id": "giusto",
 *           "key": "giusto",
 *           "value": [
 *              "alessia.angelone",
 *              "https://www.ansa.it/sito/notizie/sport/calcio/2022/07/18/dybala-ha-scelto-la-roma-sono-molto-felice_7a3cba25-525b-4f29-8c9e-ecc3b23acd85.html",
 *              "giusto"
 *           ]
 *         },
 *     {
 *           "id": "ok",
 *           "key": "ok",
 *           "value": [
 *               "alessia.angelone",
 *               "https://www.voloscontato.it/informazioni-utili/caos-aeroporti-ecco-cosa-sapere-e-quali-sono-le-compagnie-aeree-piu-a-rischio.php",
 *               "ok"
 *           ]
 *         },
 *     {
 *           "id": "si",
 *           "key": "si",
 *           "value": [
 *               "ale",
 *               "https://www.corriere.it/economia/consumi/22_luglio_18/gas-missione-draghi-algeria-in-arrivo-4-miliardi-metri-cubi-piu-primo-fornitore-l-italia-77a46cf6-06ae-11ed-baf6-636928468fea.shtml",
 *               "si"
 *           ]
 *         },
 *     {
 *           "id": "va bene",
 *           "key": "va bene",
 *           "value": [
 *               "alessia.angelone",
 *               "https://www.open.online/2022/07/18/bottega-veneta-firenze-sanzioni-russia-video/",
 *               "va bene"
 *           ]
 *        }
 *    ]
 * }
 * 
 * 
 */
/** 
 * @api {get} /commenti/lista_commenti/:user Richiesta commenti totali degli utenti (con possibilità di limitare la ricerca ai commenti di un utente in particolare)
 * @apiName Commenti
 * @apiGroup Commenti
 *
 * @apiParam user Username dell'utente a cui siamo interessati
 * @apiParamExample {text} Esempio-Richiesta:
 *      https://localhost/commenti/lista_commenti/ale
 * @apiSuccess {String} use Username utente a cui siamo interessati
 * @apiSuccess {String} notizia URL della notizia relativa al commento
 * @apiSuccess {String} messaggio Commento dell'utente
 * 
 * 
 *
 * @apiSuccessExample Success-Response:
 *     [
 *        {
 *          "use": "ale",
 *          "notizia": "https://www.liberoquotidiano.it/news/italia/32442748/meteo-mario-tozzi-sta-per-iniziare-era-del-fuoco-terribile-profezia.html",
 *          "messaggio": "esattamente"
 *        },
 *        {
 *          "use": "ale",
 *          "notizia": "https://www.corriere.it/economia/consumi/22_luglio_18/gas-missione-draghi-algeria-in-arrivo-4-miliardi-metri-cubi-piu-primo-fornitore-l-italia-77a46cf6-06ae-11ed-baf6-636928468fea.shtml",
 *          "messaggio": "si"
 *        }
 *     ]
 *
 * @apiError DB_error Errore nel database
 *
 * @apiErrorExample Error-Response:
 *   {  
 *      DB Error: error stack generato dal database
 *   }
 * 
 * 
 */