// third party 
import React from 'react';
// pages
// components
// styles


// Input for big froms like singIn
// placeholder is like normal placeholder
// type is like normal type
// onChange is callback function like onChange
// value is the same like value on normal input in most cases use the hook
const CheckInput = ({ placeholder, type, onChange, value, checked }) => {

    return (
        <input 
        // if type is submit we dont need placeholder
            defaultChecked={checked}
            placeholder={ type === 'submit' ?  '' : placeholder } 
            type={type} 
            onChange={(e) => onChange(e.target.value)} 
        // if type is submit the value must be submit
            value={ type === 'submit' ? placeholder : value  } 
        />
    )
};

export default CheckInput;