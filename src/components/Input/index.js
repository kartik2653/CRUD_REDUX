import { useState,useEffect } from 'react';
import React from 'react';
import './styles.css'
const Input = ({type,placeholder,onChange,defaultValue = ''}) => {
    
    const [value,setValue] = useState(defaultValue);
    

    useEffect(()=>{
      setValue(defaultValue);
    },[defaultValue]);
    
    return (
        <input type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>{
            onChange(e.target.value);
            setValue(e.target.value);        
        }}/>
    );
}
 
export default Input;