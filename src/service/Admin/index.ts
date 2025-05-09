/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUser = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/get-all-user`, {
        method: "GET",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-cache',
        next: { tags: ["users"] }
    });

    const result = await res.json();

    return result;
}


export const deleteUser = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/remove-user/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
        },
        cache: 'no-cache',
    });

    const result = await res.json();
    revalidateTag('users')
    return result;
}


export const activeUser = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/active-user/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
        },
        cache: 'no-cache',
    });

    const result = await res.json();

    revalidateTag('users')
    return result;
}

/* Review */

export const getAllUserReview = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/get-user-review`, {
        method: "GET",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-cache',
        next: { tags: ["reviews"] }
    });

    const result = await res.json();

    return result;
}


export const approvedUserReview = async (id: string, payload: any) => {

    const res = await fetch(`${process.env.SERVER_URL}/admin/review/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    revalidateTag('reviews')

    return result;
}

export const deleteUserReview = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/remove-inappropriate-review/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
        },
        cache: 'no-cache',
    });

    const result = await res.json();
    revalidateTag('reviews')
    return result;
}

/* Comment */
export const deleteUserComment = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/remove-inappropriate-comment/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
        },
        cache: 'no-cache',
    });

    const result = await res.json();

    revalidateTag('comments')
    return result;
}

export const getAllUserComments = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/get-user-comments`, {
        method: "GET",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-cache',
        next: { tags: ["comments"] }
    });

    const result = await res.json();


    return result;
}

export const approvedUserComment = async (id: string, payload: any) => {

    const res = await fetch(`${process.env.SERVER_URL}/admin/comment/${id}`, {
        method: "POST",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    revalidateTag('comments')

    return result;
}


export const getMostReview = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/get-most-review-title`, {
        method: "GET",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-cache',
    });

    const result = await res.json();

    return result;
}




export const getSellInfo = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/payment/sell-info`, {
        method: "GET",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-cache',
    });

    const result = await res.json();

    return result;
}
