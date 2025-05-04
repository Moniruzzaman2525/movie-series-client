"use server"
import { cookies } from "next/headers";

export const getAllUser = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/get-all-user`, {
        method: "GET",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || ""
        },
        cache: 'no-cache',
    });

    const result = await res.json();

    return result;
}


export const deleteUser = async (id: string) => {
    const res = await fetch(`${process.env.SERVER_URL}/admin/delete-user/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: (await cookies()).get("accessTokenF")?.value || "",
        },
        cache: 'no-cache',
    });

    const result = await res.json();
    return result;
}
