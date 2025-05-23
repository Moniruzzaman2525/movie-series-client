/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllContent = async (search?: string, genre?: string | undefined, Platform?: string | null, year?: string | null, Rating?: string | null) => {
    const queryParams: string[] = [];

    if (search) {
        queryParams.push(`searchTerm=${encodeURIComponent(search)}`);
    }
    if (genre) {
        queryParams.push(`genre=${encodeURIComponent(genre.toUpperCase())}`);
    }
    if (Platform) {
        queryParams.push(`streamingPlatform=${encodeURIComponent(Platform)}`);
    }
    if (year) {
        queryParams.push(`releaseYear=${encodeURIComponent(year)}`);
    }
    if (Rating) {
        queryParams.push(`overallRating=${encodeURIComponent(Rating)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";



    const res = await fetch(`${process.env.SERVER_URL}/content${queryString}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        next: {
            tags: ["content"]
        },
        cache: "no-store"
    });

    const result = await res.json();
    console.log(result)
    return result.data;
}
export const getTopRatedThisWeek = async () => {


    const res = await fetch(`${process.env.SERVER_URL}/content/get-top-rated`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        next: {
            tags: ["content"]
        },
        cache: "no-store"
    });

    const result = await res.json();
    return result.data;
}
export const getNewlyAdded = async () => {


    const res = await fetch(`${process.env.SERVER_URL}/content/get-newly-added`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        next: {
            tags: ["content"]
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
        next: { tags: ['movies'] }
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

export const updateContent = async (id: string | undefined, data: any) => {
    const res = await fetch(`${process.env.SERVER_URL}/content/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body: data,
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
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        body: data,
        cache: 'no-store',
    });
    const result = await res.json();
    revalidateTag('content')
    return result
}
