/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import React, { useState } from "react";
import { motion } from 'framer-motion';
import Review from "@/components/HomeCompoents/Details/review";
import CommentComponent from "@/components/HomeCompoents/Details/comment";
import PostReview from "@/components/HomeCompoents/Details/PostReview";
import PostComment from "@/components/HomeCompoents/Details/PostComment";
import { makePayment } from "@/service/Payments";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const tabs = ["Reviews", "Comments", "Send Review"];

const Details = ({ movieData }: {
     movieData: {
          title: string;
          genre: string;
          thumbnailImage: string;
          director: string;
          releaseYear: number;
          cast: string;
          streamingPlatform: string;
          description: string;
          rating: number;
          price: number;
          id: string;
          review?: { content: string, ratting: number }[]
          Comment?: { content: string, likes: number }[]
     }
}) => {
     const [activeTab, setActiveTab] = useState("Reviews");
     const router=useRouter()
     const handlePayment = async() => {
          const id=toast.loading("Processing Payment..")
        try{
          const paymentData={
               contentId: movieData.id,
               amount:movieData.price*120
          }
          const result=await makePayment(paymentData)
          console.log(result);
          if(result.success){
               toast.success("Payment Successful",{id})
               router.push(result.data.GatewayPageURL)
          }else{
               toast.error(result.message,{id})
          }
         
        }catch(error){
             console.log(error);
        }
     }
     return (
          <div className="bg-black text-white min-h-screen px-4 pt-28 pb-4">
               <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                         <Image
                              width={500}
                              height={500}
                              src={movieData?.thumbnailImage || ""}
                              alt={movieData?.title || ""}
                              className="w-full h-full rounded-2xl shadow-xl"
                         />
                         <div>
                              <h1 className="text-4xl font-bold text-red-600">{movieData?.title}</h1>
                              <span className="text-gray-300">{movieData?.genre}</span>
                              <hr />
                              <div className="bg-gray-800 p-4 rounded-xl shadow-lg space-y-3 mt-5">
                                   <div className="flex">
                                        <span className="w-32 text-white font-semibold">🎥 Director:</span>
                                        <span className="text-gray-300">{movieData?.director}</span>
                                   </div>
                                   <div className="flex">
                                        <span className="w-32 text-white font-semibold">📅 Year:</span>
                                        <span className="text-gray-300">{movieData?.releaseYear}</span>
                                   </div>
                                   <div className="flex">
                                        <span className="w-32 text-white font-semibold">🧑‍🤝‍🧑 Cast:</span>
                                        <span className="text-gray-300">{movieData?.cast}</span>
                                   </div>
                                   <div className="flex">
                                        <span className="w-32 text-white font-semibold">📺 Streaming On:</span>
                                        <span className="text-gray-300">{movieData?.streamingPlatform}</span>
                                   </div>
                              </div>
                              <p className="mt-4 text-white">{movieData?.description}</p>
                              <div className="mt-4 text-white font-semibold text-lg">
                                   Rating: {movieData?.rating} ⭐ | Price:<span className="text-red-500">${movieData.price}</span>
                              </div>
                              <div className="mt-4 text-white font-semibold text-lg">
                                   <motion.button
                                  onClick={handlePayment}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-red-500 px-3 py-1 rounded cursor-pointer"
                                   >
                                        Purchase
                                   </motion.button>
                              </div>
                         </div>
                    </div>


                    <div className="mt-10">
                         <div className="flex space-x-4 border-b border-red-600">
                              {tabs.map((tab) => (
                                   <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-4 py-2 text-sm font-semibold transition-all duration-200 ${activeTab === tab ? "border-b-2 border-red-600 text-red-500" : "text-gray-400"
                                             }`}
                                   >
                                        {tab}
                                   </button>
                              ))}
                         </div>
                                   {/* for review section */}
                         <div className="mt-4">
                              {activeTab === "Reviews" && (
                                   <div className="space-y-6">
                                        <h1 className="text-2xl font-bold text-white">Reviews <span className="text-gray-400">({movieData?.review?.length})</span></h1>
                                        {movieData?.review?.map((data: any, i) => (
                                             <Review data={data} index={i} key={i} />
                                        ))}
                                   </div>
                              )}

                              {/* for comments section */}
                              {activeTab === "Comments" && (
                                   <div className="space-y-6 max-w-full">
                                        <h1 className="text-2xl font-semibold text-white">Comments <span>({movieData?.Comment?.length})</span></h1>
                                        {movieData.Comment?.map((data: any, i) => (
                                            <CommentComponent data={data} index={i} key={i} />
                                        ))}


                                      <PostComment movieData={movieData}/>
                                   </div>
                              )}

                              {activeTab === "Send Review" && (
                                  <PostReview movieData={movieData}/>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Details;
