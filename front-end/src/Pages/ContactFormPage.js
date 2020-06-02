import React, {useEffect, useContext, useState} from 'react';
import ContactForm from '../Components/ContactForm';
import {ContactContext} from '../Context/ContactContext'
import {showAlert} from '../Components/Alert'
import {callContactById} from '../APIManager'

//A custom component representing the Form page
const ContactFormPage = ({match}) => {
	const [state, dispatch] = useContext(ContactContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const {_id} = match.params;
		if(_id){
			const fetchContact = async() => {
				try {
					const data = await callContactById(_id)
					dispatch({
						type: 'FETCH_CONTACT',
						payload: data,
					})
					setLoading(false)
				} catch(err){
					setLoading(false);
					showAlert(dispatch, err)
				}
			};
			fetchContact();
		} else {
			setLoading(false)
		}
	}, [match.params, dispatch]);
	if (loading) {
		return <p>Please wait...</p>;
	}
	return (
		<div>
		<ContactForm contact={state.contact}/>
		</div>
		);
};

export default ContactFormPage;