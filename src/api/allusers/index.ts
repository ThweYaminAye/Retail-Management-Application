import {
    useMutation,
    UseMutationOptions,
    // useMutation,
    // type UseMutationOptions
  } from "@tanstack/react-query";
import axi from "@/configs/axios";
import { newUserPayload } from "./types";


export const addNewUser = {
    useMutation: (opt?: UseMutationOptions< unknown,Error, newUserPayload>)=>{
       return useMutation({
        mutationKey: ['addNewUser'],
        mutationFn: (payload: newUserPayload) => {
            return axi.post('/Employees/AddNewUser', payload)
        },
        ...opt
       })
       
    }
}