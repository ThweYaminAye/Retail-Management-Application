import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";



import axios from 'axios'
const axi = axios.create({baseURL:'http://localhost:5112/api/'})


axi.interceptors.request.use(
    (config: InternalAxiosRequestConfig) =>{
        const token = Cookies.get('react-auth-token');
        if(token){
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axi.interceptors.response.use(
    (response: AxiosResponse)=>{
        return response;
    },
    (error)=>{
        if(error.response && error.respnse.status === 401){
            window.location.href = '/auth/login'
        }
        return Promise.reject(error);
    }
)

export default axi;