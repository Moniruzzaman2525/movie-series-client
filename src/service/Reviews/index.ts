/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import type { TReview } from "@/types/Reviews";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createReview = async (data:TReview) => {
    const res=await fetch(`${process.env.SERVER_URL}/reviews`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(data),
        cache:'no-cache',
    });
    
    const result=await res.json();
    revalidateTag('reviews')
    return result;
}
export const getReviews = async () => {
    const res=await fetch(`${process.env.SERVER_URL}/reviews`,{
        method:"GET",
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-cache',
        next:{ tags:["reviews"]}
    });
    
    const result=await res.json();

    return result;
}

export const deleteReview = async (id:string) => {
    const res=await fetch(`${process.env.SERVER_URL}/reviews/delete-review/${id}`,{
        method:"DELETE",
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-cache'
    });

    const result=await res.json();
    revalidateTag('reviews')
    return result;
}

export const replyToReview=async(payload:Partial<TReview>)=>{
    const res=await fetch(`${process.env.SERVER_URL}/comments`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(payload),
        cache:'no-cache',
    });

    const result=await res.json();
    revalidateTag('reviews')
    return result;
}


export const getCommentsByReview=async(id:string)=>{
    const res=await fetch(`${process.env.SERVER_URL}/comments/${id}`,{
        method:"GET",
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-cache',
        next:{ tags:["reviews"]}
    });

    const result=await res.json();

    return result;
}