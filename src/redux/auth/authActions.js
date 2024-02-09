import { AUTHORIZE_USER,UNAUTHORIZE_USER } from "./authType";

export const authorizeUser = () =>{
    return{
        type : AUTHORIZE_USER,
    }
}

export const unauthoriseUser = () =>{
    return{
        type : UNAUTHORIZE_USER,
    }
}