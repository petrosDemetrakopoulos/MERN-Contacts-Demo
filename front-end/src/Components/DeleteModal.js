import React from 'react';
import { ContactContext } from '../Context/ContactContext';
import { Modal } from 'react-bootstrap'
import {showAlert} from '../Components/Alert'
import {callDeleteContact} from '../APIManager'
const { useContext } = React;

//A custom component representing the modal asking user for contact delete verification
export default function DeleteModal({isShowing, hide, contact}) {
	const [state, dispatch] = useContext(ContactContext);
		const deleteContact = async(_id) => {
				try {
					const data = await callDeleteContact(_id)
					dispatch({
						type: 'DELETE_CONTACT',
						payload: data,
					})
				} catch(err){
					showAlert(dispatch, err)
				}
			};
			
  return(
  	<Modal show={isShowing} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Delete ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this contact ?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" variant="secondary" onClick={hide}>
            Cancel
          </button>
          <button className="btn btn-danger" variant="primary" onClick={() => deleteContact(contact._id)}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      )
}