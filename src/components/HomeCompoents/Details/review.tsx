/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaHeart, FaReply, FaThumbsDown } from "react-icons/fa6"
import { AnimatePresence, motion } from "framer-motion"
import { StarIcon } from "@radix-ui/react-icons"
import { likeReview } from "@/service/Like"
import { replyToReview } from "@/service/Reviews"

const Review = ({ data, index }: { data: any; index: number }) => {
  console.log(data);
  const [activeReplyIndex, setActiveReplyIndex] = useState<null | number>(null)
  const [liked, setLiked] = useState(data.like)
  const [disliked, setDisliked] = useState(false)
  const [likesCount, setLikesCount] = useState(data?.likes || 0)
  const [loading,setLoading]=useState(false)
  const replyForm = useForm({
    defaultValues: {
      reply: "",
    },
  })

  const handleSubmitReply = async (formData: any) => {
  try{
    const replyData = {
      reviewId: data?.id,
      content: formData.reply,
    }
    const result=await replyToReview(replyData)
    console.log(result)
    replyForm.reset()
    setActiveReplyIndex(null)
  }catch(error){

  }
  }

  const handleLike = async() => {
    const reviewData={
      reviewId:data?.id,
    }
    console.log(reviewData);
     const result=await likeReview(reviewData)
     console.log(result)
  }

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false)
    } else {
      setDisliked(true)
      if (liked) {
        setLiked(false)
        setLikesCount(likesCount - 1)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 rounded-xl border border-gray-800 shadow-xl mb-4 hover:shadow-2xl transition-all duration-300 relative"
    >
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500">
          {data?.rating}
        </h1>
        <StarIcon className="h-5 w-5 fill-amber-300 text-amber-300" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-12 w-12 ring-2 ring-gray-700 ring-offset-2 ring-offset-gray-950">
          <AvatarImage src={data?.user?.image || "https://github.com/shadcn.png"} />
          <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            {data.user?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-white text-lg">{data.user?.name}</h3>
          <p className="text-xs text-gray-400">
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="pl-2 mb-5 mt-4">
        <div className="flex items-start gap-3">
          <MessageCircle className="mt-1 flex-shrink-0 text-purple-400 h-5 w-5" />
          <p className="text-gray-200 whitespace-pre-line leading-relaxed">{data?.content}</p>
        </div>
      </div>

      <div className="flex items-center gap-6 text-sm border-t border-gray-800 pt-4">
        <button onClick={handleLike} className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 hover:text-pink-500 hover:bg-gray-800/50 transition-colors">
          <FaHeart className="h-4 w-4 cursor-pointer" />
          <span className="font-medium">{data?.like}</span>
        </button>
        <button className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 hover:text-blue-500 hover:bg-gray-800/50 transition-colors">
          <FaThumbsDown className="h-4 w-4 cursor-pointer"/>
          <span className="font-medium">{data?.dislike}Dislike</span>
        </button>
        <button
          onClick={() => setActiveReplyIndex(activeReplyIndex === index ? null : index)}
          className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-400 hover:text-emerald-500 hover:bg-gray-800/50 transition-colors"
        >
          <FaReply className="h-4 w-4 cursor-pointer" />
          <span className="font-medium">Reply</span>
        </button>
      </div>

      <AnimatePresence>
        {activeReplyIndex === index && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pl-12 overflow-hidden"
          >
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
                          className="bg-gray-800/50 border-gray-700 text-white focus:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-0 resize-none"
                          placeholder="Write your reply..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
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
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                    Post Reply
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Review
