import { CREATE_TODO,DELETE_TODO,READ_TODO,UPDATE_TODO } from "./todoTypes";
import { createAxiosTodo, readAxiosTodo, } from "../../axios";
import { setLoading, unsetLoading } from "../loader/loaderActions";
import { setAsyncError } from "../error/errorActions";
export const createTodo = (todo) =>{
 return{
    type : CREATE_TODO,
    payload: todo,
 }
}

export const deleteTodo = (id) =>{
    return{
        type : DELETE_TODO,
        payload : id,
    }
}

export const updateTodo = (id,data) =>{
    return {
        type : UPDATE_TODO,
        payload : data,
        id : id,
    }
}

export const readTodos = (data = [])=>{
   return {
    type : READ_TODO,
    payload:data,
   }
}

export const createTodoAsync = (id,data) =>{
  return async function(dispatch){
    try {
        dispatch(setLoading())
        const todo = await createAxiosTodo(id,data);
        dispatch(createTodo(todo.data));
    } catch (error) { 
       dispatch(setAsyncError([error]));
    }finally{
        dispatch(unsetLoading());
    }
  }
}

export const readTodoAsync = (id) =>{
    return async function(dispatch){
        try {
            dispatch(setLoading());
            const todos = await readAxiosTodo(id);
            dispatch(readTodos(todos.data));
        } catch (error) {
            dispatch(setAsyncError([error])); 
        }finally{
            dispatch(unsetLoading());
        }
    }
}

export const updateTodoAsync = (id,task) =>{
    return async function(dispatch){
        try{
            dispatch(updateTodo(id,task));
        } catch (error){
            console.log(error);
        }
    }
}

export const deleteTodoAsync = (id) =>{
    return async function(dispatch){
        try{
            dispatch(deleteTodo(id));
        } catch (error){
            console.log(error);
        }
    }
}