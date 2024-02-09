import { AUTHORIZE_USER, UNAUTHORIZE_USER } from "./authType"

const initialState = {
    isAuthorized : true,
}
export const authReducer = (prevState = initialState,action)=>{
 switch (action.type){
    case UNAUTHORIZE_USER :return { isAuthorized : false}
    case AUTHORIZE_USER :return {isAuthorized:true}
    default: return prevState
 }
}