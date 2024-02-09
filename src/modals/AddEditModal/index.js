import React,{useEffect, useState,useRef} from 'react';
import ModalOutbox from '../ModalOutbox';
import './styles.css'
import logo from '../../images/add_task.png'
import Label from '../../components/Label';
import Input from '../../components/Input';
import DatePicker from "react-datepicker";
import Error from '../../components/Error';
import "react-datepicker/dist/react-datepicker.css";
import SubmitButton from '../../components/SubmitButton';
import { useDispatch,useSelector } from 'react-redux';
import { createTodoAsync, readTodoAsync ,updateTodoAsync} from '../../redux/todos/todoAction';

const AddEditModal = ({toggleModal,heading,selectedTask = null}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [error,setError] = useState('');
    const [isEditing,setEditing] = useState(false);
    const ref = useRef();
    const user_id  = useSelector((state)=>state.user.id);
    // console.log(user_i);
    // const user_id = 6189067;
    const dispatch = useDispatch();
    const handleTitle = (title) =>{
   console.log(title)
    setTitle(title);
    }

    const handleSubmit = () =>{
     if(title.length <= 3){
        setError(['Tilte length must be at least 3']);
     }
     else if(description.length <=3 ){
        setError(['Description length must be at least 3']);
     }
     else{
        console.log("Task added",title,description,startDate);
        setError('');
        toggleModal();

        const task = {
          title : title + '&' +description,
          user_id,
          due_on : new Date(startDate),
          status : 'pending',
        }
        
        if(selectedTask){
          dispatch(updateTodoAsync(selectedTask.id,task));
        }
        else{
          dispatch(createTodoAsync(user_id,task));
        }
     }
    }

    const handleDescription = (e) =>{
    setDescription(e.target.value);
    console.log(e.target.value);
    }

    const hideModal = (e) =>{
        if(e.target.className === 'addEditOuterContainer')toggleModal();
    }
    
    const setDefaultValues = () =>{
      if(selectedTask){
        setStartDate(selectedTask.due_on);
        setTitle(selectedTask.title);
        setDescription(selectedTask.description);
        setEditing(true);
        
      }
    }

    useEffect(()=>{
     setDefaultValues();
    },[])
    return (
        <div>
            <ModalOutbox/>
            <div className='addEditOuterContainer' onClick={(e)=>hideModal(e)}>
               <div className='addEditContainer'>
               <header>
                 <div className='logoContainer'>
                   <img alt='logo' className='logo' src={logo}/>
                 </div>
                 <p style={{marginLeft:'15px',fontWeight:'bold'}}>{heading}</p>
               </header>


               <Label title='Title'/>
               <Input type = 'text' placeholder = 'Title'onChange = {handleTitle} defaultValue={title}/>

               <Label title='Description'/>
               <textarea 
               value={description}
               onChange={(e)=>handleDescription(e)}
              />

              <Label title='Due date'/>
              <div className='datePickerContainer' onClick={()=>ref.current.setOpen(true)}>
              <DatePicker  ref = {ref} selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
              

              <SubmitButton title="Save" onClick={handleSubmit}/>
               </div>
             
             
             
               {error && <Error error = {error}/>}      
            </div>

                
        </div>
    );
}
 
export default AddEditModal;
/* 
{due_on: Thu Feb 01 2024 02:26:15 GMT+0530 (India Standard Time), status: 'pending'}
due_on: '2024-02-03T10:54:03.000+05:30'
*/