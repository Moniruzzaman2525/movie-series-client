/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const addWatchList = async (payload:any) => {
    const res = await fetch(`${process.env.SERVER_URL}/watch-list`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body:JSON.stringify(payload),
        cache:'no-store',
    })
    const result=await res.json()
    revalidateTag('watch')
    return result
}
