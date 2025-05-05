/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllContent= async ({searchTerm,filters}:{searchTerm:string,filters:any}) => {
    const queryParams=new URLSearchParams()
    if(searchTerm){
        queryParams.append('searchTerm',searchTerm)
    }
    if(filters){
        Object.entries(filters).forEach(([key,value])=>{
            if(value){
                queryParams.append(key,value.toString())
            }
        })
    }
    const response = await fetch(`${process.env.SERVER_URL}/content?${queryParams.toString()}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-store',
        next:{tags:['content']}
    });
    const data = await response.json();
    return data;
}

export const getContentById = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-store',
        next:{tags:['content']}
    });
    const result = await res.json();
    return result
}

export const deleteContent = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-store',
    });
    const result = await res.json();
    revalidateTag('content')
    return result
}

export const updateContent = async (id: string, data: any) => {
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body: JSON.stringify(data),
        cache: 'no-store',
    });
    const result = await res.json();
    revalidateTag('content')
    return result
}
export const createContent = async (data: any) => {
    const res = await fetch(`${process.env.SERVER_URL}/content`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body: JSON.stringify(data),
        cache: 'no-store',
    });
    const result = await res.json();
    revalidateTag('content')
    return result
}
