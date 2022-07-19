const expect = require("chai").expect;
const fetch = require("node-fetch");

describe("GET /", () => {
	it("send GET request to http://localhost/", async () => {
	  await fetch("http://localhost/")
		.then((result) => {
		  expect(result.status).to.equal(200);
		})
		.catch((err) => {
		  console.error(err.message);
		});
	});
  });

  describe("GET /commenti/lista_commenti/ahahhahshsgdggdhfhfhfh", () => {
	it("send GET request to http://localhost/commenti/lista_commenti/ahahhahshsgdggdhfhfhfh", async () => {
	  await fetch("http://localhost/commenti/lista_commenti/ahahhahshsgdggdhfhfhfh")
		.then((result) => {
		  expect(result.status).to.equal(200);
		})
		.catch((err) => {
		  console.error(err.message);
		});
	});
  });

describe("GET /commenti/lista_commenti", () => {
  it("send GET request to http://localhost/commenti/lista_commenti", async () => {
    await fetch("http://localhost/commenti/lista_commenti")
      .then((result) => {
        expect(result.status).to.equal(200);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
});

describe("GET /commenti/lista_commenti/alessia.angelone", () => {
  it("send GET request to http://localhost/commenti/lista_commenti/alessia.angelone", async () => {
    await fetch("http://localhost/commenti/lista_commenti/alessia.angelone")
      .then((result) => {
        expect(result.status).to.equal(200);
      })
      .catch((err) => {
        console.error(err.message);
      });
  });
});