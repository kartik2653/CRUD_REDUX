import { SET_ERROR, UNSET_ERROR } from "./errorTypes"

const initialState = {
    isError : false,
    error : [],
}
export const errorReducer = (prevState = initialState,action) =>{
   switch (action.type){
    case SET_ERROR:return {isError : true,error : action.payload};

    case UNSET_ERROR: return {isError : false,error : []};

    default : return prevState;
   }
}