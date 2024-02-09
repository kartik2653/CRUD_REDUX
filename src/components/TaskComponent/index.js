import React from 'react';
import './styles.css';
import editIcon from '../../images/edit.png';
import deleteIcon from '../../images/delete.png';
import completedIcon from '../../images/complete_icon.png';
import { useDispatch } from 'react-redux';
import { updateTodoAsync } from '../../redux/todos/todoAction';
const TaskComponent = ({task,editTask,deleteTask}) => {
    
    const dispatch = useDispatch();
    const completedTaskHandler = (id,task) =>{
      const updatedTask = {
        ...task,
        title: task.title+'&'+task.description,
        status:'completed',
      }

      dispatch(updateTodoAsync(id,updatedTask));
    }
    return (
        <div className='taskContainer' key={task.id}>
         <div className='titleContainer'>
            <div className='titleTextContainer'>
                <p className='title'>{task.title}</p>
            </div>
            <div className='iconsContainer'>

                

                {
                  task.status === 'pending'&&
                  <div className='iconContainer completeIcon' onClick={()=>completedTaskHandler(task.id,task)}>
                  <img src={completedIcon} style={{width:'100%',height:'100%'}} alt='edit'/>
                </div>
                }

                { task.status === 'pending' &&
                <div className='iconContainer' onClick={()=>editTask(task.id,task)}>
                  <img src={editIcon} style={{width:'100%',height:'100%'}} alt='edit'/>
                </div>
                 }

                <div className='iconContainer' onClick={()=>deleteTask(task.id,task)}>
                  <img src={deleteIcon} style={{width:'100%',height:'100%'}} alt='delete'/>
                </div>
                
            </div>
            
         </div>
         <p className='description'>{task.description}</p>   
            
        </div>
    );
}
 
export default TaskComponent;