import React, { useContext, useEffect, useState } from 'react';
import ContactList from '../Components/ContactList';
import {ContactContext} from '../Context/ContactContext'
import Alert, {showAlert} from '../Components/Alert'
import {callAllContacts} from '../APIManager'

//A custom component representing the Contact list page
const ContactListPage = () => {
	const [state, dispatch] = useContext(ContactContext);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async() => {
			try {
				const data = await callAllContacts()
				dispatch({
					type: 'FETCH_CONTACTS',
					payload: data,
				})
				setLoading(false);
			} catch(err){
				setLoading(false);
				showAlert(dispatch, err)
			}};
			fetchData()}, [dispatch]);
	if (loading) {
		return <p>Please wait...</p>;
	}
	return (
		<div>
		<h2 style={{marginTop: '1rem'}}>Contacts</h2>
		{state.message.content && <Alert message={state.message}/>}
		<ContactList contacts={state.contacts} />
		</div>
		);
};

export default ContactListPage;