"use server"
import { cookies } from "next/headers"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getPaymentByUserEmail=async(email:string)=>{
    const res=await fetch(`${process.env.SERVER_URL}/payment/${email}`,{
        method:'GET',
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-cache',
        next: {tags: ['payments']}
    })
    const result=await res.json()
    return result
}

