import { setError,unSetError } from "../redux/error/errorActions";

export const getCompletedTasks = (tasks) =>{
    const completedTasks = tasks.filter((task)=>task.status === 'completed');
    return completedTasks;
}

export const getPendingTasks = (tasks) =>{
    const currDate = new Date();
    const currDay = currDate.getDate();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth() + 1;
    
    const pendingTasks = tasks.filter((task) => {
        if(task.status === 'pending'){
        const taskDueDate = new Date(task.due_on).toDateString();
        
        const [taskDayString,taskMonthString,taskDateString,taskYearString] = taskDueDate.split(' ');
        
        

        const taskYear = parseInt(taskYearString);
        const taskMonth = parseMonth(taskMonthString);
        const taskDay = parseInt(taskDateString);
        if(currYear < taskYear){
            return task;
        }
        else if(currYear === taskYear){
            if(currMonth < taskMonth)return task;
            else if(currMonth === taskMonth){
                if(currDay <= taskDay)return task;
            }
        }
}});
    return pendingTasks;
}

export const getOverdueTasks = (tasks) =>{
    const currDate = new Date();
    const currDay = currDate.getDate();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth() + 1;
    
    const overdueTasks = tasks.filter((task) => {
        if(task.status === 'pending'){
        const taskDueDate = new Date(task.due_on).toDateString();
        const [taskDayString,taskMonthString,taskDateString,taskYearString] = taskDueDate.split(' ');
        

        const taskYear = parseInt(taskYearString);
        const taskMonth = parseMonth(taskMonthString);
        const taskDay = parseInt(taskDateString);
        if(currYear > taskYear){
            return task;
        }
        else if(currYear === taskYear){
            if(currMonth > taskMonth)return task;
            else if(currMonth === taskMonth){
                if(currDay > taskDay)return task;
            }
        }
}});
    return overdueTasks;
}

const parseMonth = (month) =>{
    switch (month){
        case 'Jan': return 1;
        case 'Feb': return 2;
        case 'Mar' : return 3;
        case 'Apr': return 4;
        case 'May': return 5;
        case 'Jun' : return 6;
        case 'Jul': return 7;
        case 'Aug': return 8;
        case 'Sep' : return 9;
        case 'Oct': return 10;
        case 'Nov': return 11;
        case 'Dec' : return 12;
        default : return -1;
    }
}



