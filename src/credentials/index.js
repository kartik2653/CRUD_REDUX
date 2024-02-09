import { getCompletedTasks, getPendingTasks,getOverdueTasks } from "../helper";

export const getUser = (userState) =>{
     
    
    const [name,password] = userState.name.split('&');
    const[firstName,lastName] = name.split('*');
    const user = {
        id: userState.id,
        firstName,
        lastName,
        password,
        email: userState.email,

    }
    return user;
};


export const getTodos = (todos) =>{
    const data = todos.map((todo)=>{
        const [title,description] = todo.title.split('&');
        const due_on = todo.due_on;
        const id = todo.id;
        const user_id = todo.user_id;
        const status = todo.status;
        return{
            title,
            description,
            due_on,
            id,
            user_id,
            status,
        }
    });

    const completedTasks = data.length > 0 ? getCompletedTasks(data) : [];
    const pendingTasks = data.length > 0 ? getPendingTasks(data) : [];

    const overdueTasks = data.length > 0 ? getOverdueTasks(data) :[];

    return [completedTasks,pendingTasks,overdueTasks];
}