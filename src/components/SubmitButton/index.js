import React from 'react';
import './styles.css'
const SubmitButton = ({title,onClick}) => {
    return (
        <button className = 'submitButton' onClick={(e)=>onClick(e)}>{title}</button>
    );
}
 
export default SubmitButton;