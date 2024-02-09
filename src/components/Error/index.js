import React from 'react';
import './styles.css'
const Error = ({error}) => {
    return (
        <div className='errorContainer'>
            {
                error.map((err,index)=><p key={index}>{err}</p>)
            }
            
        </div>
    );
}
 
export default Error;