import React, { useReducer, createContext } from 'react';
import reducer from './ContactReducer'

export const ContactContext = createContext();

const initialState = {
  contacts: [],
  contact: {},
  message: {}
};

//This function provides the main context of the app. 
//The components of the app share the state via ContactContextProvider
export const ContactContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;

  return (
    <ContactContext.Provider value={[state, dispatch]}>
    {children}
    </ContactContext.Provider>
    );
};
