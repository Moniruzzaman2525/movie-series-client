/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const addWatchList = async (payload: any) => {
    const res = await fetch(`${process.env.SERVER_URL}/watch-list`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
    })
    const result = await res.json()
    revalidateTag('movies')
    return result
}
export const getWatchList = async () => {

    const res = await fetch(`${process.env.SERVER_URL}/watch-list`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        next: {
            tags: ["movies"]
        },
        cache: "no-store"
    });

    const result = await res.json();
    return result.data;
}


export const removeWhatsList = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/watch-list/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-store',
    })
    const result = await res.json()
    revalidateTag('movies')
    return result
}
