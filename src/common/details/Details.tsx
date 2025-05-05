/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaThumbsDown, FaReply } from "react-icons/fa";
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

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
          review?: string[]
          Comment?: { content: string, likes: number }[]
     }
}) => {
     const [activeTab, setActiveTab] = useState("Reviews");
     const [activeReplyIndex, setActiveReplyIndex] = useState<null | number>(null);

     const form = useForm({
          defaultValues: {
               comment: ""
          }
     });

     const handleSubmitComment = (data: any) => {
          const commentData={
               ...data,
           videoId:movieData.id
          }
          console.log(commentData);
          // form.reset();
     };

     return (
          <div className="bg-black text-white min-h-screen px-4 pt-28 pb-4">
               <div className="container mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                         <Image
                              width={500}
                              height={500}
                              src={movieData?.thumbnailImage || ""}
                              alt={movieData?.title || ""}
                              className="w-full h-auto rounded-2xl shadow-xl"
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
                                   Rating: {movieData?.rating} ⭐ | Price: ${movieData.price}
                              </div>
                              <div className="mt-4 text-white font-semibold text-lg">
                                   <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-red-500 px-3 py-1 rounded cursor-pointer"
                                   >
                                        Purchase
                                   </motion.button>
                              </div>
                         </div>
                    </div>

                    {/* Tabs */}
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

                         <div className="mt-4">
                              {activeTab === "Reviews" && (
                                   <div className="space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                             <div key={i} className="bg-gray-900 p-4 rounded-xl shadow-lg">
                                                  <p className="text-white">Amazing sci-fi concept! 🌌</p>
                                                  <div className="text-sm text-red-400 mt-2">Rating: 9/10</div>
                                             </div>
                                        ))}
                                   </div>
                              )}

                              {activeTab === "Comments" && (
                                   <div className="space-y-4">
                                        {movieData.Comment?.map((data: any, i) => (
                                             <div key={i} className="bg-gray-900 p-4 rounded-xl shadow-lg">
                                                  <p className="text-white">{data.content}</p>
                                                  <div className="flex items-center mt-2 space-x-4 text-red-400">
                                                       <button className="flex items-center space-x-1 hover:text-red-500">
                                                            <FaHeart /> <span>{data.likes} Likes</span>
                                                       </button>
                                                       <button className="flex items-center space-x-1 hover:text-red-500">
                                                            <FaThumbsDown /> <span>Unlike</span>
                                                       </button>
                                                       <button
                                                            onClick={() =>
                                                                 setActiveReplyIndex(activeReplyIndex === i ? null : i)
                                                            }
                                                            className="flex items-center space-x-1 hover:text-red-500"
                                                       >
                                                            <FaReply /> <span>Reply</span>
                                                       </button>
                                                  </div>


                                                  <div className={`mt-2 ${activeReplyIndex === i ? "block" : "hidden"}`}>
                                                       <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(handleSubmitComment)} className="flex flex-col space-y-2">
                                                                 <FormField
                                                                      control={form.control}
                                                                      name="comment"
                                                                      render={({ field }) => (
                                                                           <FormItem>
                                                                                <FormLabel>Reply</FormLabel>
                                                                                <FormControl>
                                                                                     <Textarea  rows={3} className="border rounded border-red-500" {...field} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                           </FormItem>
                                                                      )}
                                                                 />
                                                                 <Button type="submit">Send</Button>
                                                            </form>
                                                       </Form>
                                                  </div>
                                             </div>
                                        ))}

                                        {/* Bottom Comment Box */}
                                        <div className="py-2">
                                        <Form {...form}>
                                                            <form onSubmit={form.handleSubmit(handleSubmitComment)} className="flex flex-col space-y-2">
                                                                 <FormField
                                                                      control={form.control}
                                                                      name="comment"
                                                                      render={({ field }) => (
                                                                           <FormItem>
                                                                                <FormLabel>Comment</FormLabel>
                                                                                <FormControl>
                                                                                     <Textarea  rows={3} className="border rounded border-red-500" {...field} />
                                                                                </FormControl>
                                                                                <FormMessage />
                                                                           </FormItem>
                                                                      )}
                                                                 />
                                                                 <div className="flex justify-end">
                                                                 <Button variant="outline" className="cursor-pointer" type="submit">Post</Button>
                                                                 </div>
                                                            </form>
                                                       </Form>
                                        </div>
                                   </div>
                              )}

                              {activeTab === "Send Review" && (
                                   <form className="space-y-4">
                                        <div>
                                             <label className="block text-sm mb-1">Rating (out of 10)</label>
                                             <input
                                                  type="number"
                                                  min="1"
                                                  max="10"
                                                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                             />
                                        </div>
                                        <div>
                                             <label className="block text-sm mb-1">Review</label>
                                             <textarea
                                                  rows={4}
                                                  className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                                                  placeholder="Write your review here..."
                                             ></textarea>
                                        </div>
                                        <div>
                                             <label className="block text-sm mb-1">Contains Spoiler?</label>
                                             <select className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700">
                                                  <option value="no">No</option>
                                                  <option value="yes">Yes</option>
                                             </select>
                                        </div>
                                        <button
                                             type="submit"
                                             className="bg-red-600 hover:bg-red-700 transition-all px-4 py-2 rounded-lg text-white font-semibold"
                                        >
                                             Submit Review
                                        </button>
                                   </form>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Details;
