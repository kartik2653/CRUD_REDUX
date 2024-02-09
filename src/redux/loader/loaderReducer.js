import { LOADING, NOT_LOADING } from "./loaderTypes"


const initialState = {
    isLoading : false,
}

export const loaderReducer = (prevState = initialState,action)=>{

    switch (action.type){
        case LOADING :return {
            isLoading : true,
        }
        case NOT_LOADING : return{
            isLoading : false,
        }
        default : return prevState;
    }
}