import React from 'react';
import './styles.css'
const ModalOutbox = ({hideModal}) => {
    return (
        <div className='modalOffset' onClick={(e)=>console.log(e.target.className)}/>
    );
}
 
export default ModalOutbox;