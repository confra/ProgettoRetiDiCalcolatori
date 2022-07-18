# Day News

Il nostro progetto consiste in un portale in cui vengono raccolte notizie in continuo aggiornamento che coprono diversi ambiti quali: intrattenimento, sport, business, tecnologia, salute e scienza.
Una volta effettuato il login l'utente può leggere le varie notizie e inoltre lasciare un commento riguardante l'articolo d'interesse.

# STRUTTURA DELL'APPLICAZIONE
![Struttura Applicazione](./StrutturaProgetto)

# REQUISITI E TECNOLOGIE USATE 
 - L'applicazione utilizza Docker per la containerizzazione delle varie componenti e Docker Compose per l'orchestrazione delle stesse.
 - Utilizzo di Nginx che svolge il ruolo di web server e couchdb come database per memorizzare gli utenti e i commenti;
 - Utilizzo di tre container Node per il load balancing;
 - Nginx è in grado di comunicare sulla porta 443 in https (Soddisfacimento requisiti di sicurezza);
 - L'applicazione utilizza RabbitMQ per far comunicare in maniera asincrona il server principale con un'istanza Nodejs che utilizza Nodemailer per iniviare un'email di conferma della registrazione agli utenti.
 - Due servizi REST esterni: Google News per raccogliere le notizie e Google Calendar per memorizzare l'accesso al sito 
 - Login tramite l'oauth di Google
 - Sono implementati dei test tramite Mocha e Chai (automazione del processo di test);
 - E' implementata una forma di CI/CD tramite github actions (utilizzo delle github actions);
 - Offre API documentate tramite APIDOC: commenti degli utenti e possibilità di filtrare tramite l'username i commenti di un determinato utente
 - Utilizzo di NodeJS per il back-end

 # GUIDA ALL'USO
 Clonare la repository del nostro progetto e spostarsi all'interno della directory ProgettoRetiDiCalcolatori:
 ```
git clone https://github.com/confra/ProgettoRetiDiCalcolatori.git
cd ProgettoRetiDiCalcolatori
```
All'interno di questa cartella avviare il progetto tramite Docker con i comandi:
```
docker compose build
docker compose up
```
A questo punto verranno creati 7 container:
 - Nginx
 - RabbitMQ
 - 3 istanze di Node
 - CouchDB
 - Nodemailer

 Per accedere al servizio da un browser andare su:
```
https://localhost:443
``` 
## TEST
Per effettuare i test,  dirigersi all'interno di un container node ed eseguire il comando 
```
"npm run test"
```
E' presente una procedura di CI/CD attraverso Github Actions.
