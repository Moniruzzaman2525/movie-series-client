/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { MessageSquare, Send, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment, getVideoComments } from "@/service/Comments"
import { likeComment } from "@/service/Like"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import type { IComment, CommentProps, MovieCardProps } from "@/types"
import type { TReview } from "@/types/Reviews"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"

interface MovieProps {
  movie: {
    id: string;
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
    review?: TReview[] | undefined;
    Comment?: IComment[] | undefined;
  };
}


const UpdatedComment: React.FC<any> = ({ movie }:{movie:MovieCardProps}) => {
  const [comments, setComments] = useState<IComment[]>(movie.Comment || [])
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [likeLoading, setLikeLoading] = useState<string | null>(null)




 


  const CommentSkeleton = () => (
    <div className="flex gap-3 animate-pulse">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-3 w-16 rounded" />
        </div>
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-3/4 rounded" />
        <div className="flex items-center gap-4 mt-2">
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="h-3 w-14 rounded" />
        </div>
      </div>
    </div>
  )


   const form = useForm({
          defaultValues: {
               content: "",
          }
     });
  
     const handleSubmitComment = async (data: any) => {
          const id = toast.loading('posting.....')
          try {
               const commentData = {
                    ...data,
                    videoId: movie.id
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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full mx-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments for {movie.title}
      </h3>

      <div className=" p-2 rounded-lg ">
                                            
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

      {loading ? (
        <div className="space-y-6">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-4">{comments?.length} Comments</h4>
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">{comment.user.name}</h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="text-xs cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      Reply
                    </button>
                    <button
                      // onClick={() => handleLikeComment(comment.id)}
                      disabled={likeLoading === comment.id}
                      className="flex items-center gap-1 text-xs cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <Heart
                        className={`h-3 w-3 ${comment.isLiked ? "fill-red-500 text-red-500" : ""} ${likeLoading === comment.id ? "opacity-50" : ""}`}
                      />
                      <span>{comment.likes} likes</span>
                    </button>
                  </div>

                  {replyingTo === comment.id && (
                    <div className="mt-3 flex gap-2">
                      <Textarea
                        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <Button
                        type="button"
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        // onClick={}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-12 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-900 dark:text-white">{reply.user.name}</h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UpdatedComment
