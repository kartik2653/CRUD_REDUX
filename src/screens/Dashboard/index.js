import React,{useState,useEffect} from 'react';
import './styles.css';
import TasksContainer from '../../components/TasksComponent';
import AddEditModal from '../../modals/AddEditModal';
import DeleteModal from '../../modals/DeleteModal';
import { useSelector,useDispatch } from 'react-redux';
import { deleteTodoAsync, readTodoAsync } from '../../redux/todos/todoAction';
import { getTodos } from '../../credentials';
import { Navigate,useNavigate} from 'react-router-dom';
import { authorizeUser, unauthoriseUser } from '../../redux/auth/authActions';
import { createUser } from '../../redux/user/UserActions';
import Loader from '../../components/Loader';
import { setAsyncError } from '../../redux/error/errorActions';
import Error from '../../components/Error';
const Dashboard = () => {

    const[showModal,setShowModal] = useState(false);
    const[showDeleteModal,setShowDeleteModal] = useState(false);
    const[heading,setHeading] = useState('Add new task');
    const[selectedTask,setSelectedTask] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state)=>state.todo);
    const todo = getTodos(data);
    const isAuthorized = useSelector((state)=>state.auth.isAuthorized);
    const isLoading = useSelector((state)=>state.loader.isLoading);
    const {isError,error} = useSelector((state)=>state.error);
    

    const toggleAddModal = () =>{
        setHeading('Add new task');
        setSelectedTask(null);
        setShowModal((prev)=>{
            return !prev;
        });
    }

    const editHandler = (id,task) =>{
        setHeading('Edit task');
        setSelectedTask(task);
        setShowModal((prev)=>!prev);
        
    }

    const toggleDeleteModal = (id = null,task = null) =>{
        setShowDeleteModal((prev)=>{
            if(!prev){
                setSelectedTask(task);
            }
            return !prev;
        });
    }

    const deleteHandler = (val) =>{
        dispatch(deleteTodoAsync(selectedTask.id));
        setSelectedTask(null);
    }


    
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('users'))[0];
            dispatch(createUser(user));
            dispatch(authorizeUser());
            try {
                dispatch(readTodoAsync(user.id));  
            } catch (error) {
               dispatch(setAsyncError([error])); 
            }
            
        }else{
            dispatch(unauthoriseUser());
        }
        
    },[isAuthorized]);



    

  



    return (
         
        
        <div className='dashboardOuterContainer'>
        {
            !isAuthorized?<Navigate to={'login'} replace/>:
            <div className='container' style={{overflow: showModal || showDeleteModal ? 'hidden' : 'visible'}}>
            <div className='header'>
                <h1 onClick={()=>navigate('/profile')} style={{cursor:'pointer'}}>Your space</h1>
                <button className = 'addTaskButton' onClick={toggleAddModal}>New Task</button>
            </div>
            <TasksContainer editTask = {editHandler} deleteTask = {toggleDeleteModal} data = {todo} />
             {isLoading && <Loader/>}
            {showModal && <AddEditModal toggleModal = {toggleAddModal} heading = {heading} selectedTask = {selectedTask}/>}
            {showDeleteModal && <DeleteModal toggleModal={toggleDeleteModal} confirmDelete = {deleteHandler}/>}
            {isError && <div className='errorHandler'>
                <p style={{color :'#fff',
                 padding:'20px 15px',
                 textAlign:'center',
                 backgroundColor:'#FF5252',
                 borderRadius: '7px',
                 width:'fit-content',
                 margin:'auto',
                  }}>
                {error[0]} 
                </p>
               
            </div>
            }
        </div>
        }
        </div>

        
    );
}
 
export default Dashboard;