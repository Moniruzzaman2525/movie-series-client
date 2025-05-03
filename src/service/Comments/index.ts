/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { cookies } from "next/headers"

export const getComments = async () => {
    const res=await fetch(`${process.env.SERVER_URL}/comments`,{
        method:'GET',
        cache:'no-store',
        next: {tags: ['comments']}
    })
    const result=await res.json()
    return result
}

export const createComment = async (payload:any) => {
    const res=await fetch(`${process.env.SERVER_URL}/comments`,{
        method:'POST',
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(payload),
        cache:'no-store',
        next: {tags: ['comments']}
    })
    const result=await res.json()
    return result
}