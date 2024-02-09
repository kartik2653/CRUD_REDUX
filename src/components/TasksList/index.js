import React from 'react';
import TaskComponent from '../TaskComponent';
const TasksList = ({data,editTask,deleteTask}) => {
    return (
        <div>
            {
                data.map((task)=><TaskComponent key={task.id} task = {task} editTask = {editTask} deleteTask = {deleteTask} />)
            }
        </div>
      
    );
}
 
export default TasksList;