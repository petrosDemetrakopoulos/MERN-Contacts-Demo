//The part that handlea the communication with the API.
//Every HTTP request to the API is sent via this layer.
const APIAddress = 'http://localhost:8080/api/contacts/';
export async function callCreateContact(data) {
	const resp = fetch(APIAddress, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	return resp.data;
}

export async function callUpdateContact(data, contact) {
	const resp = await fetch(
		APIAddress + contact._id,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		}
		);
	return await resp.json();
}

export async function callDeleteContact(_id) {
	const resp = await fetch(APIAddress + _id, {method: 'DELETE'});
	return await resp.json();
}

export async function callContactById(_id) {
	const resp = await fetch(APIAddress + _id);
	return await resp.json();
}

export async function callAllContacts() {
	const resp = await fetch(APIAddress)
	return await resp.json();
}