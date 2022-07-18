const chai = require('chai');
const chaiHttp = require('chai-http');
const describe = require('mocha').describe;
const it = require('mocha').it;



const app = require('../app');


chai.use(chaiHttp);
chai.should();

describe('Test dell\'applicazione', () => {
	it('/dovrebbe restituire 200 OK con un body', (done) => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.property('body');
				done();
			});
	});
});

describe('Test delle api del sito', () => {
	it('Endpoint /api dovrebbe restituire 200 OK con body che indica la mancanza di un attributo', (done) => {
		chai.request(app)
			.get('/lista_commenti')
			.end((err, res) => {
				res.should.have.property('body');
				done();
			});
	});

	it('Endpoint dovrebbe restituire 200 OK specifcando che non esiste nessun utente quell username che ha commentato', (done) => {
		chai.request(app)
			.get('/lista_commenti/ahahhahshsgdggdhfhfhfh')
			.end((err, res) => {
				res.should.have.property('body');
				done();
			});
	});



    
    it('Endpoint dovrebbe restituire 200 OK con body nel quale è presente un file json contenente i commenti', (done) => {
		chai.request(app)
			.get('/lista_commenti/alessia.angelone')
			.end((err, res) => {
				res.should.have.property('body');
				done();
			});
	});

});