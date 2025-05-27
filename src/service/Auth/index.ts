"use server"

import { jwtDecode } from "jwt-decode"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const createUser = async (payload: FieldValues) => {
     const res = await fetch(`${process.env.SERVER_URL}/user`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)

     })

     const result = await res.json()
     return result
}
export const loginUser = async (payload: FieldValues) => {
     const res = await fetch(`${process.env.SERVER_URL}/auth`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)

     })

     const result = await res.json()
     if (result.success) {
          (await cookies()).set("accessTokenF", result?.data.accessToken)
     }
     return result
}
export const forgotPass = async (payload: FieldValues) => {
     const res = await fetch(`${process.env.SERVER_URL}/auth/forget-password`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)

     })

     const result = await res.json()
     return result
}
export const resetPass = async (token: string, payload: FieldValues) => {
     const res = await fetch(`${process.env.SERVER_URL}/auth/reset-password`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json",
               Authorization: token

          },
          body: JSON.stringify(payload)

     })

     const result = await res.json()
     return result
}


export const getCurrentUser = async () => {
     const accessToken = (await cookies()).get("accessTokenF")?.value
     let decodedData = null
     if (accessToken) {
          decodedData = await jwtDecode(accessToken);
          return decodedData
     }

}

export const getUser = async () => {
     const res = await fetch(`${process.env.SERVER_URL}/user/me`, {
          method: "GET",
          headers: {
               Authorization: (await cookies()).get("accessTokenF")?.value || "",
               "Content-Type": "application/json"
          },
          next: {
               tags: ["profile"]
          }
     })
     const result = await res.json()
     return result
}

export const updateUser = async (payload: FieldValues) => {
     const res = await fetch(`${process.env.SERVER_URL}/user/update-profile`, {
          method: "PATCH",
          headers: {
               Authorization: (await cookies()).get("accessTokenF")?.value || "",
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
     })
     const result = await res.json()
     revalidateTag('profile')
     return result
}


export const updatePassword = async (payload: FieldValues) => {
     const res = await fetch(`${process.env.SERVER_URL}/user/update-password`, {
          method: "PATCH",
          headers: {
               Authorization: (await cookies()).get("accessTokenF")?.value || "",
               "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
     })
     const result = await res.json()
     return result
}

export const logOut = async () => {
     (await cookies()).delete("accessTokenF")
}
