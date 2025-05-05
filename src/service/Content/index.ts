/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllContent = async (search: string, genre: string | undefined) => {
    const queryParams: string[] = [];

    if (search) {
        queryParams.push(`searchTerm=${encodeURIComponent(search)}`);
    }

    if (genre) {
        queryParams.push(`genre=${encodeURIComponent(genre.toUpperCase())}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const res = await fetch(`${process.env.SERVER_URL}/content${queryString}`, {
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

export const getContentById = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-store',
        next: { tags: ['content'] }
    });
    const result = await res.json();
    return result
}

export const deleteContent = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`, {
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
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`, {
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
    const res = await fetch(`${process.env.SERVER_URL}/content`, {
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
