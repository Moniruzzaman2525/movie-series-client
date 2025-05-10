"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

/* eslint-disable @typescript-eslint/no-explicit-any */

export const makePayment=async(payment:any)=>{
    const res=await fetch(`${process.env.SERVER_URL}/payment`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(payment),
        cache:'no-cache',
        
    })
    const result=await res.json()
    revalidateTag('payments')
    return result
}
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


export const getAllPayment=async()=>{
    const res=await fetch(`${process.env.SERVER_URL}/payment`,{
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
