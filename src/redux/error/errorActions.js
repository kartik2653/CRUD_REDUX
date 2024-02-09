import { SET_ERROR, UNSET_ERROR } from "./errorTypes"

export const setError = (error) =>{
    return {
        type : SET_ERROR,
        payload : error,
    }
}

export const unSetError = () =>{
    return {
        type :UNSET_ERROR,
        payload : [],
    }
}

export const setAsyncError = (error) =>{
    return function(dispatch){
       dispatch(setError(error));

       const timer = setTimeout(()=>{
        dispatch(unSetError());
       },2000);
    }
}