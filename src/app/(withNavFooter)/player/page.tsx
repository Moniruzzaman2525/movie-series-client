"use client";
import { getContentById } from "@/service/Content";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const [videLink,setVideoLink]=useState("")
  const searchParams = useSearchParams();
const id = searchParams.get("id");
useEffect(() => {
  if (!id) return;
  const getSingleVideo = async () => {
    const result = await getContentById(id);
    setVideoLink(result.data.video);
  };
  getSingleVideo();
}, [id]);

if (!id) {
  return (
    <div>
        <h1></h1>
  </div>
  )
}
  return (
    <div className="flex justify-center items-center h-screen bg-black">
    {videLink &&
      <iframe className="shadow-lg rounded-lg border border-red-500 p-1"
        height={400}
        width={900}
        src={videLink}
        allowFullScreen
      />

    }
    </div>
  );
};

export default Page;
