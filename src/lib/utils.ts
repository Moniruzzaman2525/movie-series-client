/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// utils/uploadToImgBB.ts or wherever you keep utility functions
export const uploadToImgBB = async (imageFile: File): Promise<string> => {
  const imgbbApiKey = "1895f282aeefa0e5b0a737b61fd5c2d1"; // Ideally from env variable
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url; // Return the image URL
  } catch (error: any) {
    throw new Error(error.message || "Failed to upload image");
  }
};

