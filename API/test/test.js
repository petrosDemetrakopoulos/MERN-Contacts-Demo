const app = require('../server');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const after = require('mocha').after;
const before = require('mocha').before;
const it = require('mocha').it;
const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
before(function (done) {
	console.log('Waiting for API server to start...');
	setTimeout(done, 2500);
});
let firstResponse = {};

describe('testing / GET (API is alive)', function () {
	let resp = {};
	it('should return 200', async () => {
		return request(app)
		.get('/')
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(200);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "message" ', function () {
		expect(resp).to.have.property('message');
	});

});
describe('testing /api/contacts/ POST', function () {
	const payload = { name: 'user name', 
	email: 'valid@email.com', 
	phones: ['1234567890', '6912345678'], 
	address: 'an address' };
	let resp = {};
	it('should return 200', async () => {
		return request(app)
		.post('/api/contacts/')
		.send(payload)
		.set('Accept', 'application/json')
		.then(function (response) {
			resp = response.body;
			firstResponse = response.body;
			expect(response.status).to.equal(200);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "name" ', function () {
		expect(resp).to.have.property('name');
	});

	it('should have property "phones" ', function () {
		expect(resp).to.have.property('phones');
	});

	it('should have property "address" ', function () {
		expect(resp).to.have.property('address');
	});
});

describe('testing /api/contacts/ POST with invalid email and phones', function () {
	const payload = { name: 'user name', 
	email: 'invalid_mail', 
	phones: ['12345', '6912345678'], 
	address: 'an address' };
	let resp = {};
	it('should return 422', async () => {
		return request(app)
		.post('/api/contacts/')
		.send(payload)
		.set('Accept', 'application/json')
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(422);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "validationErrors" ', function () {
		expect(resp).to.have.property('validationErrors');
	});

	it('"validationErrors" should be an array', function () {
		expect(resp.validationErrors).to.be.a('array');
	});

	it('"validationErrors" should contain  "{email: \'Not a valid email address\'} "', function () {
		expect(resp.validationErrors).to.deep.include({email: 'Not a valid email address'});
	});

	it('"validationErrors" should contain  "{phones: [\'12345\']} "', function () {
		expect(resp.validationErrors).to.deep.include({phones: ['12345']});
	});

});

describe('testing /api/contacts/ GET', function () {
	let resp = {};
	it('should return 200', async () => {
		return request(app)
		.get('/api/contacts/')
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(200);
		});
	});

	it('should be an array', function () {
		expect(resp).to.be.a('array');
	});

	it('should have length > 0', function () {
		expect(resp).to.have.lengthOf.above(0);
	});

});

describe('testing /api/contacts/:id GET', function () {
	let resp = {};
	it('should return 200', async () => {
		return request(app)
		.get('/api/contacts/' + firstResponse._id)
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(200);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "name" ', function () {
		expect(resp).to.have.property('name');
	});

	it('should have property "phones" ', function () {
		expect(resp).to.have.property('phones');
	});

	it('should have property "address" ', function () {
		expect(resp).to.have.property('address');
	});
});

describe('testing /api/contacts/:id GET for an invalid id', function () {
	let resp = {};
	it('should return 500', async () => {
		return request(app)
		.get('/api/contacts/notExist')
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(500);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "message" ', function () {
		expect(resp).to.have.property('message');
	});

	it('"message" should equal "Error getting contact with id notExist"', function () {
		expect(resp.message).to.equal('Error getting contact with id notExist');
	});

});

describe('testing /api/contacts/:id PUT', function () {
	let resp = {};
	const payload = {name: 'updated name'}
	it('should return 200', async () => {
		return request(app)
		.put('/api/contacts/' + firstResponse._id)
		.send(payload)
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(200);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "name" ', function () {
		expect(resp).to.have.property('name');
	});

	it('"name" should equal "updated name"', function () {
		expect(resp.name).to.equal('updated name');
	});

	it('should have property "phones" ', function () {
		expect(resp).to.have.property('phones');
	});

	it('should have property "address" ', function () {
		expect(resp).to.have.property('address');
	});
});

describe('testing /api/contacts/:id DELETE', function () {
	let resp = {};
	const payload = {name: 'updated name'}
	it('should return 200', async () => {
		return request(app)
		.delete('/api/contacts/' + firstResponse._id)
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(200);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "_id" ', function () {
		expect(resp).to.have.property('_id');
	});

	it('should have property "message" ', function () {
		expect(resp).to.have.property('message');
	});

	it('"message" should equal "Contact deleted successfully!"', function () {
		expect(resp.message).to.equal('Contact deleted successfully!');
	});
});

describe('testing /api/contacts/:id GET for a deleted id', function () {
	let resp = {};
	it('should return 404', async () => {
		return request(app)
		.get('/api/contacts/' + firstResponse._id)
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(404);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "message" ', function () {
		expect(resp).to.have.property('message');
	});

	it('"message" should equal "Contact with id ' + firstResponse._id + ' not found', function () {
		expect(resp.message).to.equal('Contact with id ' + firstResponse._id + ' not found');
	});

});

describe('testing /api/contacts/:id DELETE for an invalid id', function () {
	let resp = {};
	it('should return 500', async () => {
		return request(app)
		.delete('/api/contacts/invalidId')
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(500);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "message" ', function () {
		expect(resp).to.have.property('message');
	});

	it('"message" should equal "Error deleting Contact with id invalidId"', function () {
		expect(resp.message).to.equal('Error deleting Contact with id invalidId');
	});
});

describe('testing /api/contacts/:id DELETE for an already deleted id', function () {
	let resp = {};
	it('should return 404', async () => {
		return request(app)
		.delete('/api/contacts/' + firstResponse._id)
		.then(function (response) {
			resp = response.body;
			expect(response.status).to.equal(404);
		});
	});

	it('should be an object', function () {
		expect(resp).to.be.a('object');
	});

	it('should have property "message" ', function () {
		expect(resp).to.have.property('message');
	});

	it('"message" should equal "Contact with id ' + firstResponse._id + ' not found', function () {
		expect(resp.message).to.equal('Contact with id ' + firstResponse._id + ' not found');
	});
});
