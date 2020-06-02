function emailValidationFunction(email) {
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(String(email).toLowerCase());
}

function phoneValidationFunction(phone) {
	const phoneRegex = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/
	return phoneRegex.test(String(phone));
}

function getInvalidPhones(phones) {
	return phones.filter(phone => phoneValidationFunction(phone) === false)
}

exports.validateCreateUpdate = (body) => {
	let errors = []
	if(body.email) {
		if(!emailValidationFunction(body.email)){
			errors.push({email: 'Not a valid email address'});
		}
	}

	if(body.phones && body.phones.length > 0) {
		const invalidPhones = getInvalidPhones(body.phones)
		if(invalidPhones.length > 0) {
			errors.push({phones: invalidPhones});
		}
	}
	return errors;
}