import axios from 'axios';
import {message} from 'antd';


export const userLogin =(reqObj)=> async dispatch =>{

    dispatch({type:'LOADING',payload:true})

    try{
        const response = await axios.post('http://localhost:5000/api/users/login' ,reqObj);
        localStorage.setItem('user' ,JSON.stringify(response.data));
        message.success('Login successful')
        dispatch({type:'LOADING',payload:false})
    }                            
    catch(error){
        console.log(error)
        message.error("Something went wrong");
        dispatch({type:'LOADING',payload:false})
    }
}

export const userRegister = (reqObj)=>async dispatch =>{

    dispatch({type:'LOADING',payload:true})

    try{
        const response = await axios.post('http://localhost:5000/api/users/register' ,reqObj);
        message.success('Registration successful')
        dispatch({type:'LOADING',payload:false})
    }                            
    catch(error){
        console.log(error)
        dispatch({type:'LOADING',payload:false})
    }
}