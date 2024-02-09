import { LOADING,NOT_LOADING } from "./loaderTypes";

export const setLoading = () =>{
    return {
        type : LOADING,
    }
}

export const unsetLoading = () =>{
    return {
        type :NOT_LOADING,
    }
}