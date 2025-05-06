/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createComment = async (payload:any) => {
    const res=await fetch(`${process.env.SERVER_URL}/comments`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(payload),
        cache:'no-store',
    })
    const result=await res.json()
    revalidateTag('comments')
    return result
}
export const getComments = async () => {
    const res=await fetch(`${process.env.SERVER_URL}/comments`,{
        method:'GET',
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-store',

        next: {tags: ['comments']}
    })
    const result=await res.json()
    return result
}
export const getVideoComments = async (videoId: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/comments/comment-by-content/${videoId}`,{
        method:'GET',
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-store',

        next: {tags: ['comments']}
    })
    const result = await res.json()

    return result
}



export const deleteComment = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/comments/delete-comment/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: (await cookies()).get("accessTokenF")?.value || "",
      },
      cache: 'no-store',
    });

    const result = await res.json();
    revalidateTag('comments');
    return result;
  };

export const updateComment = async (payload:any) => {
    const res=await fetch(`${process.env.SERVER_URL}/comments/edit-comment/${payload.id}`,{
        method:'PATCH',
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(payload),
        cache:'no-store',
        next: {tags: ['comments']}
    })
    const result=await res.json()
    revalidateTag('comments')
    return result
}

export const getCommentByUser= async (id:string) => {
    const res=await fetch(`${process.env.SERVER_URL}/comments/comment-by-user/${id}`,{
        method:'GET',
        headers:{
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache:'no-store',
        next: {tags: ['comments']}
    })
    const result=await res.json()
    return result
}
