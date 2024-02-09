import { CREATE_TODO, DELETE_TODO, READ_TODO, UPDATE_TODO } from "./todoTypes";
export const todoReducer = (prevState = [],action) =>{
    switch (action.type){
        case CREATE_TODO :return [...prevState,action.payload];
        case READ_TODO : return [...action.payload];
        case UPDATE_TODO : {
            const newTodo = prevState.filter((todo)=>todo.id !== action.id);
            return [action.payload,...newTodo];
        }
        case DELETE_TODO:{
            const newTodo = prevState.filter((todo)=>todo.id !== action.payload);
            return newTodo;  
        }
        default: return prevState;
    }
}