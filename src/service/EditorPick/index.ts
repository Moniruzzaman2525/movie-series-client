/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const addEditorPick = async (payload: any) => {
    const res = await fetch(`${process.env.SERVER_URL}/editorsPick`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body: JSON.stringify(payload),
        cache: 'no-store',
    })
    const result = await res.json()
    revalidateTag('comments')
    return result
}


export const getEditorPick = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/editorsPick`, {
        method: 'GET',
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-store',
    })
    const result = await res.json()
    return result
}
