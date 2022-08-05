const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const user = process.env.COUCHDB_USER;
const password = process.env.COUCHDB_PASSWORD;

const db = require('nano')('http://'+ user + ':' + password + '@couchdb:5984/');

async function getDOC(dbName, id){
    const conn = db.use(dbName);
    const ciao = await conn.get(id);
    return ciao;
}

async function insertDOC(dbName, JSON){
    //controlli nel DB prima dell'inserimento
    //  **********************
    //  **********************
    const conn = db.use(dbName);
    const response = await conn.insert(JSON);
    console.log("RISPOSTA COUCH: " + response);
}

//*************************************************************************************************
//                                                                                  GESTIONE UTENTI

function inserisciUtente(JSON_utente){
    //controlli su JSON_utente
    //  **********************
    //  **********************   
    insertDOC("utenti", JSON_utente);
}

function getUtente(id){
    //EVENTUALI CONTROLLI
    //  **********************
    //  **********************
    return getDOC("utenti", id);
}

function inserisciCommento(JSON_commento){
    insertDOC("commenti", JSON_commento);
}

module.exports = { inserisciUtente, getUtente, inserisciCommento }