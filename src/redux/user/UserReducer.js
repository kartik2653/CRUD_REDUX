import { CREATE_USER,UPDATE_USER } from "./UserTypes";


const initialState = {
    name : '',
    email:'',
    gender:'male',
    status:'inactive',
}
export const userReducer = (prevState = initialState,action) =>{
   switch(action.type){
    case CREATE_USER:{
        return {
            ...action.payload
        }
    }

    case UPDATE_USER:{
        return {
            ...action.payload,
        }
    }

    default: return prevState;
   }
}


