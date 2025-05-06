/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaThumbsDown, FaReply } from "react-icons/fa";
import { motion } from 'framer-motion';
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem,  FormLabel,  FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { createComment } from "@/service/Comments";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {MessageCircle} from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createReview } from "@/service/Reviews";
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
          review?: {content:string,ratting:number}[]
          Comment?: { content: string, likes: number }[]
     }
}) => {
     const [activeTab, setActiveTab] = useState("Reviews");
     const [activeReplyIndex, setActiveReplyIndex] = useState<null | number>(null);

     const form = useForm({
          defaultValues: {
               content: "",
          }
     });

     const replyForm=useForm({
          defaultValues:{
               reply:"",
          }
     })

     const reviewForm=useForm({
          defaultValues:{
               rating:0,
               content:''
          }
     })
     const handleSubmitComment = async (data: any) => {
          const id = toast.loading('posting.....')
          try {
               const commentData = {
                    ...data,
                    videoId: movieData.id
               }
               const result = await createComment(commentData)
               console.log(result);
               if (result.success == true) {
                    toast.success("Comment Added Successfully", { id })
                    form.reset()
               } else {
                    toast.error(result.message, { id })
               }
          } catch (error) {
               toast.error((error as Error).message)
          }
          form.reset();
     };


     const handleSubmitReply = async (data: any) => {
          console.log(data);
     }


     const handleSubmitReview = async (data: any) => {
        try{
          const reviewData={
               content:data.content,
               rating:Number(data.rating),
               videoId:movieData.id
          }
          const result=await createReview(reviewData)
          console.log(result);
          if(result.success==true){
               toast.success("Review Added Successfully")
               reviewForm.reset()
          } else{
               toast.error(result.message)
          }
        }catch(error){
             toast.error((error as Error).message)
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

                         <div className="mt-4">
                              {activeTab === "Reviews" && (
                                   <div className="space-y-4">
                                        <h1 className="text-2xl font-semibold text-white">Reviews <span>({movieData?.review?.length})</span></h1>
                                        {movieData?.review?.map((data:any, i) => (
                                               <div key={i} className="flex items-center gap-3 mb-3">
                                               <Avatar className="h-10 w-10">
                                                 <AvatarImage src={data.user.image || "https://github.com/shadcn.png"} />
                                                 <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                                               </Avatar>
                                               <div>
                                                 <h3 className="font-semibold text-white">{data.user.name}</h3>
                                                 <p className="text-xs text-gray-400">
                                                   {new Date(data.createdAt).toLocaleDateString()}
                                                 </p>
                                               </div>
                                             </div>
                                        ))}
                                   </div>
                              )}

                              {activeTab === "Comments" && (
                                  <div className="space-y-6 max-w-full">
                                   <h1 className="text-2xl font-semibold text-white">Comments <span>({movieData?.Comment?.length})</span></h1>
                                  {movieData.Comment?.map((data: any, i) => (
                                    <div key={i} className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-lg">
                                    
                                      <div className="flex items-center gap-3 mb-3">
                                        <Avatar className="h-10 w-10">
                                          <AvatarImage src={data.user.image || "https://github.com/shadcn.png"} />
                                          <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="font-semibold text-white">{data.user.name}</h3>
                                          <p className="text-xs text-gray-400">
                                            {new Date(data.createdAt).toLocaleDateString()}
                                          </p>
                                        </div>
                                      </div>
                                
                                      
                                      <div className="pl-2 mb-4">
                                        <div className="flex items-start gap-2">
                                          <MessageCircle className="mt-1 flex-shrink-0 text-gray-400" />
                                          <p className="text-gray-200 whitespace-pre-line">{data.content}</p>
                                        </div>
                                      </div>
                                
                                     
                                      <div className="flex items-center gap-4 text-sm border-t border-gray-700 pt-3">
                                        <button className="flex items-center gap-1 text-gray-300 hover:text-red-500 transition-colors">
                                          <FaHeart className="h-4 w-4 cursor-pointer" />
                                          <span>{data.likes} Likes</span>
                                        </button>
                                        <button className="flex items-center gap-1 text-gray-300 hover:text-blue-500 transition-colors">
                                          <FaThumbsDown className="h-4 w-4 cursor-pointer" />
                                          <span>Dislike</span>
                                        </button>
                                        <button
                                          onClick={() => setActiveReplyIndex(activeReplyIndex === i ? null : i)}
                                          className="flex items-center gap-1 text-gray-300 hover:text-green-500 transition-colors"
                                        >
                                          <FaReply className="h-4 w-4 cursor-pointer" />
                                          <span>Reply</span>
                                        </button>
                                      </div>
                                
                                      
                                      {activeReplyIndex === i && (
                                        <div className="mt-4 pl-12">
                                          <Form {...replyForm}>
                                            <form onSubmit={replyForm.handleSubmit(handleSubmitReply)} className="space-y-3">
                                              <FormField
                                                control={replyForm.control}
                                                name="reply"
                                                render={({ field }) => (
                                                  <FormItem>
                                                    <FormControl>
                                                      <Textarea
                                                        rows={2}
                                                        className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none "
                                                        placeholder="Write your reply..."
                                                        {...field}
                                                      />
                                                    </FormControl>
                                                    <FormMessage />
                                                  </FormItem>
                                                )}
                                              />
                                              <div className="flex justify-end gap-2">
                                                <Button
                                                  variant="ghost"
                                                  onClick={() => setActiveReplyIndex(null)}
                                                  className="text-gray-300 hover:bg-gray-800"
                                                >
                                                  Cancel
                                                </Button>
                                                <Button type="submit" className="bg-red-600 hover:bg-red-700">
                                                  Post Reply
                                                </Button>
                                              </div>
                                            </form>
                                          </Form>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                
                                 
                                  <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                                    <h3 className="text-lg font-semibold text-white mb-3">Leave a comment</h3>
                                    <Form {...form}>
                                      <form onSubmit={form.handleSubmit(handleSubmitComment)} className="space-y-3">
                                        <FormField
                                          control={form.control}
                                          name="content"
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormControl>
                                                <Textarea
                                                  rows={4}
                                                  className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                                  placeholder="Share your thoughts about this movie..."
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                        <div className="flex justify-end">
                                          <Button type="submit" className="bg-red-600 hover:bg-red-700 px-6">
                                            Post Comment
                                          </Button>
                                        </div>
                                      </form>
                                    </Form>
                                  </div>
                                </div>
                              )}

                              {activeTab === "Send Review" && (
                                  <Form {...form}>
                                  <form onSubmit={reviewForm.handleSubmit(handleSubmitReview)} className="space-y-3">
                                  
                                    <FormField
                                      control={reviewForm.control}
                                      name="rating"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Rating</FormLabel>
                                          <Select  onValueChange={field.onChange} defaultValue={''}>
                                            <FormControl>
                                              <SelectTrigger  className="bg-gray-800 border-gray-700 text-white focus:ring-0 focus:ring-offset-0 focus:border-red-500 w-full">
                                                <SelectValue placeholder="Select a rating" />
                                              </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <SelectItem 
                                                  key={num} 
                                                  value={num.toString()}
                                                  className="hover:bg-gray-700 focus:bg-gray-700"
                                                >
                                                  {num}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                
                                   
                                    <FormField
                                      control={reviewForm.control}
                                      name="content"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Your Review</FormLabel>
                                          <FormControl>
                                            <Textarea
                                              rows={4}
                                              className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                                              placeholder="Share your thoughts about this movie..."
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                
                                    <div className="flex justify-end">
                                      <Button type="submit" className="bg-red-600 hover:bg-red-700 px-6 cursor-pointer">
                                        Submit Review
                                      </Button>
                                    </div>
                                  </form>
                                </Form>
                              )}
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Details;
