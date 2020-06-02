module.exports = app => {
	const contacts = require('../controllers/ContactController.js')
	var router = require('express').Router();

	router.post('/', contacts.create);
	router.get('/', contacts.findAll);
	router.get('/:id', contacts.findOne);
	router.put('/:id', contacts.update);
	router.delete('/:id', contacts.delete);

	app.use('/api/contacts', router)

}