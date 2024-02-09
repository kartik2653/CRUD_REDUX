import React, { useEffect, useState } from 'react';
import './styles.css';
import TasksList from '../TasksList';
const TasksContainer = ({editTask,deleteTask,data}) => {

   const[completedTasks,setCompletedTasks] = useState([]);
   const[pendingTasks,setPendingTasks] = useState([]);
   const[overdueTasks,setOverdueTasks] = useState([]);
    

   useEffect(()=>{
    setCompletedTasks(data[0]);
    setPendingTasks(data[1]);
    setOverdueTasks(data[2]);
   },[data])
    return (
        <div className='tasksContainer'>

          <div className='completedTasks'>
            <div className='taskHeader'>
              <p>Completed tasks</p>
              <p style={{
              textAlign:'center',
              fontSize:'20px',
              color:'#4CAF50',
              fontWeight:'bold',
              }}>
                {completedTasks.length}
              </p>
             </div>
             <TasksList data={completedTasks} editTask = {editTask} deleteTask ={deleteTask}/>
          </div>


          <div className='pendingTasks'>
            <div className='taskHeader'>
              <p>Pending tasks</p>
              <p style={{
              textAlign:'center',
              fontSize:'20px',
              color:'#2196F3',
              fontWeight:'bold',
              }}>{pendingTasks.length}</p>
            </div>
            <TasksList data={pendingTasks} editTask = {editTask} deleteTask ={deleteTask}/>
          </div>

          

          <div className='overdueTasks'>
            <div className='taskHeader'>
                <p>Overdue tasks</p>
                <p style={{
                  textAlign:'center',
                  fontSize:'20px',
                  color:'#FF5252',
                  fontWeight:'bold',
              }}>{overdueTasks.length}</p>
            </div>
            <TasksList data={overdueTasks} editTask = {editTask} deleteTask ={deleteTask}/>
          </div>
          
        </div>
    );
}
 
export default TasksContainer;