import axios from "axios";
import { config } from "../constants/constants";

export const createAxiosUser = async(user) =>{
    try{
        const response = await axios.post('https://gorest.co.in/public/v2/users',user,config);
        const data = response.data;
        return data;

    } catch (error) {
       throw error.message;
    }
    
}

export const updateAxiosUser = async(user,id) =>{
    try{
        const response = await axios.put(`https://gorest.co.in/public/v2/users/${id}`,user,config);
        const data = response.data;
        return data;

    } catch (error) {
       throw error.message;
    }
    
}

export const createAxiosTodo = async(id,data) =>{
    try {
        const response = await axios.post(`https://gorest.co.in/public/v2/users/${id}/todos`,data,config);
        return response;
    } catch (error) {
       throw error.message;
    }
}

export const readAxiosTodo = async(id) =>{
 
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users/${id}/todos`,config);
        return response;
    } catch (error) {
        throw error.message;
    }
}

export const updateAxiosTodo = async(id,data)=>{
    try {
        const response = await axios.put(`https://gorest.co.in/public/v2/users/${id}/todos`,data,config);
        return response;
    } catch (error) {
        throw new Error(error.message);
    } 
}

