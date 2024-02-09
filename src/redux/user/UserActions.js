import { CREATE_USER,UPDATE_USER } from "./UserTypes";
import { createAxiosUser,updateAxiosUser } from "../../axios";
import { setAsyncError } from "../error/errorActions";
import { setLoading,unsetLoading } from "../loader/loaderActions";

export const createUser = (userDetails) =>{
    return{
        type: CREATE_USER,
        payload: userDetails,  
    }
}

export const updateUser = (userDetails,id) =>{
    return{
        type:UPDATE_USER,
        payload:userDetails,
        id:id,
    }
}


export const createUserAsync = (user)=>{
    return async function(dispatch){
        try{
            const data = await createAxiosUser(user);
            dispatch(createUser(data));
            localStorage.setItem('users',JSON.stringify([data]));
        }catch (error) {
            dispatch(setAsyncError([error]));
        //    throw new Error(error);
        }
    }
}

export const updateUserAsync = (user,id)=>{
    return async function(dispatch){
       try{
           dispatch(setLoading());
           const data = await updateAxiosUser(user,id);
           dispatch(updateUser(data,id));
           localStorage.setItem('users',JSON.stringify([data]));
       }catch(error){
        dispatch(setAsyncError([error]));
       }finally{
        dispatch(unsetLoading());
       }
    }
}
