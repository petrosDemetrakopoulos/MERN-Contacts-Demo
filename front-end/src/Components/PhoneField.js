import React from 'react';
import {useFormContext} from 'react-hook-form'

//A custom component representing an entry in the list of phones of a contact (input field with delete button)
export default function PhoneField({phone, index, handleChangeInput, handleRemoveClick}) {
		const methods = useFormContext();
		const {errors, register} = methods;
	return (
		<div key={index}>
			<div className="form-group telephone" key={index}>
				<input type="tel" 
				className={`form-control ${errors.phones && errors.phones[index] ? 'is-invalid': ''}`} 
				value={phone}
				onChange={e => handleChangeInput(index,e)}
				id={index}
				name={`phones[${index}]`}
				ref={register({
                  pattern: /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/,
                })}/>
				<button className="btn btn-danger"
						type="button" 
						style={{marginLeft: '0.5rem'}}
						onClick={() => handleRemoveClick(index)} 
						value={index}>
		<span className="fa fa-trash" aria-hidden="true"></span> 
		</button>
           </div>
           	<p className="help-block text-danger">
              {errors.phones && errors.phones[index] && 'Invalid phone'}
           </p>
           </div>
		);
}