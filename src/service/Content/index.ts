/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllContent = async (page?: string, limit?: string,
    query?: { [key: string]: string | string[] | undefined },
) => {
    const params = new URLSearchParams();

    if (query?.ctg) {
        params.append(`category`, query?.ctg.toString().toUpperCase());
    }

    if (query?.search) {
        params.append(`searchTerm`, query?.search.toString());
    }
    if (query?.category) {
        params.append(`genre`, query?.category.toString().toUpperCase());
    }

    if (query?.platform) {
        params.append(`streamingPlatform`, query?.platform.toString().toUpperCase());
    }
    if (query?.year) {
        params.append(`releaseYear`, query?.year.toString());
    }
    if (query?.Rating) {
        params.append(`overallRating`, query?.Rating.toString());
    }


    const res = await fetch(`${process.env.SERVER_URL}/content?limit=${limit}&page=${page}&${params}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        next: {
            tags: ["content"]
        },
        cache: "no-cache",
    });

    const result = await res.json();

    return result.data;
}

export const countingMovieSeries = async () => {

    const res = await fetch(`${process.env.SERVER_URL}/content/count-movies-series`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        next: {
            tags: ["content"]
        },
        cache: "no-cache",
    });

    const result = await res.json();

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
        cache: "no-cache",
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
        cache: "no-cache",
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
