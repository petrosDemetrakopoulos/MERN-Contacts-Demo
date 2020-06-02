import React, { useState } from 'react';
//import { useForm, FormContext, useFormContext } from 'react-hook-form';
import PhoneField from './PhoneField'

export default function PhoneList({ initPhones }) {
    const [phones, setPhones] = useState(initPhones);
   // const methods = useFormContext();

    const handleAddClick = () => {
        setPhones([
            ...phones, ''
        ]);
    }

  const handleRemoveClick = (index) => {
    const values = [...phones];
    values.splice(index, 1);
    setPhones(values);
  };

    const handleChangeInput = (index, event) => {
    const values = [...phones];
    values[index] = event.target.value;
    setPhones(values);
  };

    return (
        <div className="form-group">
   		{phones && phones.map((phone, index) => (
   			<PhoneField phone={phone} 
   			index={index} 
   			key={index} 
   			handleChangeInput={handleChangeInput}
   			handleRemoveClick={handleRemoveClick}/>
   			))}
		<button type="button" className="btn btn-primary" onClick={() => handleAddClick()}><span className="fa fa-plus" aria-hidden="true"></span> Add phone </button>
		</div>
    );
}