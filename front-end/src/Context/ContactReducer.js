//The reducer that returns the next state of the app after an action
export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_CONTACTS': {
      return {
        ...state,
        contacts: action.payload,
        contact: {}
      };
    }
    case 'SHOW_NOTIFICATION': {
      return {
        ...state,
        message: action.payload,
      };
    }
    case 'CREATE_CONTACT': {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        message: {
          type: 'success',
          title: 'Success',
          content: 'New Contact created!',
        },
      };
    }
    case 'UPDATE_CONTACT': {
      const contact = action.payload;
      return {
        ...state,
        contacts: state.contacts.map(item => item._id === contact._id ? contact: item),
        message: {
          type: 'success',
          title: 'Success',
          content: 'Contact with id' + contact._id + ' updated',
        },
      };
    }
    case 'FETCH_CONTACT' : {
      return {
        ...state,
        contact: action.payload,
        message: {}
      };
    }
    case 'DELETE_CONTACT': {
      const { _id } = action.payload;
      return {
        ...state,
        contacts: state.contacts.filter(item => item._id !== _id),
        message: {
          type: 'success',
          title: 'Delete Successful!',
          content: `Contact "${_id}" has been deleted!`,
        },
      };
    }
    default:
    throw new Error();
  }
}