const db = require('../models');
const Contact = db.contacts;
const helpers = require('../helpers/helpers');

exports.create = (req, res) => {
  //validations
  let errors = helpers.validateCreateUpdate(req.body);

  if(errors.length > 0){
  	return res.status(422).send({validationErrors: errors});
  }
  
  const contact = new Contact({
  	name: req.body.name,
  	email: req.body.email,
  	address: req.body.address,
  	phones: req.body.phones
  })

  contact.save(contact).then(data => res.send(data))
  .catch(err => {
  	res.status(500).send({
  		message: err.message 
  	});
  })
};

exports.findAll = (req, res) => {
	Contact.find()
	.then(data => {
		res.send(data);
	})
	.catch(err => {
		res.status(500).send({
			message: err.message 
		});
	});
};

exports.findOne = (req, res) => {
	const id = req.params.id;
	Contact.findById(id)
	.then(data => {
		if (!data)
			res.status(404).send({ message: 'Contact with id ' + id + ' not found' });
		else res.send(data);
	})
	.catch(err => {
		res
		.status(500)
		.send({ message: 'Error getting contact with id ' + id });
	});
};

exports.update = (req, res) => {
	if (!req.body) {
		return res.status(400).send({
			message: 'Body can not be empty!'
		});
	}

	let errors = helpers.validateCreateUpdate(req.body);

	if (errors.length > 0) {
		return res.status(422).send({validationErrors: errors})
	}

	const id = req.params.id;

	Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
	.then(data => {
		if (!data) {
			res.status(404).send({
				message: 'Cannot update Contact with id ' + id + '. It may not exist.'
			});
		} else { 
			res.send(data);
		}
	})
	.catch(err => {
		res.status(500).send({
			message: 'Error updating Contact with id ' + id
		});
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	Contact.findByIdAndDelete(id, { useFindAndModify: false })
	.then(data => {
		if (!data) {
			res.status(404).send({
				message: 'Contact with id ' + id + ' not found'
			});
		} else {
			res.send({
				_id: id,
				message: 'Contact deleted successfully!'
			});
		}
	})
	.catch(err => {
		res.status(500).send({
			message: 'Error deleting Contact with id ' + id
		});
	});
};
