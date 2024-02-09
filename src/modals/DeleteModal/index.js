import React from 'react';
import ModalOutbox from '../ModalOutbox';
import './styles.css'
import deleteLogo from '../../images/delete_icon.png';
const DeleteModal = ({toggleModal,confirmDelete}) => {

    const handlerDelete = () =>{
      confirmDelete(true);
      toggleModal();
    }
    return (
        
        <div className='deleteModal'>
        <ModalOutbox/>
            <div className='deleteModalOuterContainer' onClick={(e)=>e.target.className === 'deleteModalOuterContainer' && toggleModal()}>
                <div className='modalContainer'>
                    <div className='deleteLogoContainer'>
                       <img src={deleteLogo} className='deleteLogo' alt='delete icon'/>
                    </div>

                    <h2 style={{color:'#fff'}}>Are you sure ?</h2>

                    <p style={{textAlign:'center',
                    margin:'20px 0px',
                    color:'#fff',
                    lineHeight:'25px'}}>
                        This action cannot be undone. All values associated with this task will be lost. 
                    </p>
                
                   <button 
                   onClick={handlerDelete}
                   style={{width:'90%',
                   padding:'15px 20px',
                   backgroundColor:'#E01D49',
                   border:'none',
                   outline:'none',
                   color:'#fff',
                   fontSize:'20px',
                   borderRadius: '50px',
                   cursor:'pointer',
                   }}>Delete Task</button>
                </div>
            </div>
        </div>
    );
}
 
export default DeleteModal;