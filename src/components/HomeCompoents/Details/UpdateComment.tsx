/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState } from "react"
import { MessageSquare, Send, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment } from "@/service/Comments"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import type { IComment, MovieCardProps } from "@/types"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"

const UpdatedComment: React.FC<any> = ({ movie }: { movie: MovieCardProps }) => {
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
    },
  })

  const handleSubmitComment = async (data: any) => {
    const id = toast.loading("posting.....")
    try {
      const commentData = {
        ...data,
        videoId: movie.id,
      }
      const result = await createComment(commentData)
      console.log(result)
      if (result.success == true) {
        toast.success("Comment Added Successfully", { id })
        form.reset()
      } else {
        toast.error(result.message, { id })
      }
    } catch (error) {
      toast.error((error as Error).message)
    }
    form.reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-xl p-6 w-full mx-auto shadow-lg border border-gray-200 dark:border-gray-800"
    >
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-red-500" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
          Comments for {movie.title}
        </span>
      </h3>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="p-4 rounded-lg bg-white dark:bg-gray-800/50 shadow-md mb-6 border border-gray-100 dark:border-gray-700"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitComment)} className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:border-red-500 focus-visible:ring-1 focus-visible:ring-red-500 focus-visible:ring-offset-0 resize-none transition-all duration-200"
                      placeholder="Share your thoughts about this movie..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-6 shadow-md hover:shadow-lg transition-all duration-200 text-white border-0"
              >
                <Send className="h-4 w-4 mr-2" /> Post Comment
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>

      {loading ? (
        <div className="space-y-6">
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>
      ) : (
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
            <span className="bg-red-500/10 text-red-500 dark:text-red-400 px-2 py-0.5 rounded-full text-xs font-semibold">
              {comments?.length}
            </span>
            Comments
          </h4>

          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="flex gap-3 bg-white dark:bg-gray-800/30 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-200">
                <Avatar className="h-10 w-10 ring-2 ring-red-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                    {comment.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">{comment.user.name}</h5>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      className="text-xs cursor-pointer flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <polyline points="9 17 4 12 9 7"></polyline>
                        <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                      </svg>
                      Reply
                    </button>
                    <button
                      disabled={likeLoading === comment.id}
                      className="flex items-center gap-1 text-xs cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <Heart
                        className={`h-3 w-3 ${comment.isLiked ? "fill-red-500 text-red-500" : ""} ${
                          likeLoading === comment.id ? "opacity-50" : ""
                        } transition-all duration-200`}
                      />
                      <span>{comment.likes} likes</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {replyingTo === comment.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 flex gap-2 overflow-hidden"
                      >
                        <Textarea
                          className="flex-1 p-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                          placeholder="Write your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white border-0 self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {comment.replies && comment.replies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="ml-12 space-y-4 border-l-2 border-red-200 dark:border-red-800/30 pl-4"
                >
                  {comment.replies.map((reply, replyIndex) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: replyIndex * 0.1 }}
                      className="flex gap-3 bg-white/50 dark:bg-gray-800/20 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800"
                    >
                      <Avatar className="h-8 w-8 ring-1 ring-red-500/20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-400 text-white text-xs">
                          {reply.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h5 className="font-medium text-gray-900 dark:text-white text-sm">{reply.user.name}</h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.5);
        }
      `}</style>
    </motion.div>
  )
}

export default UpdatedComment
