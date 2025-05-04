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
        method: "DELETE",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
        },
        cache: 'no-cache',
    });

    const result = await res.json();
    revalidateTag('users')
    return result;
}

export const getAllUserReview = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/get-user-review`, {
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

