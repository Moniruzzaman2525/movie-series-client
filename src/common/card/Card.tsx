"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { MovieCardProps } from "@/types/Movie"
import { Heart, MessageCircle } from "lucide-react"
import Comment from "@/components/ui/core/Modal/Comment"
import { useUser } from "@/context/userContext"
import LoginPrompt from "./LoginPrompt"
import { likeVideo } from "@/service/Like"

const ReusableCard = ({ movie }: { movie: MovieCardProps }) => {
     const { user } = useUser()


     const [showCommentModal, setShowCommentModal] = useState(false)
     const [showLoginModal, setShowLoginModal] = useState(false)
     const [loginAction, setLoginAction] = useState<"like" | "comment">("like")


     const handleLikeToggle = async () => {
          if (!user) {
               setLoginAction("like")
               setShowLoginModal(true)
               return
          }
          const data = {
               videoId: movie.id,
          }
          await likeVideo(data)
     }

     const handleCommentClick = () => {
          if (!user) {
               setLoginAction("comment")
               setShowLoginModal(true)
               return
          }

          setShowCommentModal(true)
     }

     return (
          <div className="flex flex-col h-full justify-between border bg-gray-50 dark:bg-black dark:border-white/20 border-black/10 w-full rounded-xl p-3 overflow-hidden shadow hover:shadow-lg transition-shadow">
               <div className="space-y-3">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                         {movie?.title} ({movie?.releaseYear})
                    </h2>

                    <p className="text-neutral-500 text-sm dark:text-neutral-300 line-clamp-3">{movie?.description}</p>

                    <div className="relative w-full h-40 rounded-xl overflow-hidden">
                         <Image
                              src={movie?.thumbnailImage || ""}
                              alt={movie?.title || "image"}
                              fill
                              className="object-cover transition"
                         />
                    </div>

                    <div className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                         <p>
                              <strong>Genre:</strong> {movie?.genre}
                         </p>
                         <p>
                              <strong>Director:</strong> {movie?.director}
                         </p>
                         <p>
                              <strong>Platform:</strong> {movie?.streamingPlatform}
                         </p>
                         <p>
                              <strong>Price:</strong> ${movie?.price}
                         </p>
                         <p>
                              <strong>Rating:</strong> ⭐ {movie?.rating}
                         </p>
                    </div>
               </div>

               {/* Like and Comment buttons */}
               <div className="flex items-center gap-4 mt-4">
                    <button
                         onClick={handleLikeToggle}
                         className="flex items-center gap-1"
                         aria-label={movie.liked ? "Unlike" : "Like"}
                    >
                         <Heart
                              className={`h-5 w-5 ${movie.liked ? "fill-red-500 text-red-500" : "text-neutral-500 dark:text-neutral-400"}`}
                         />
                         <span className="text-sm text-neutral-600 dark:text-neutral-300">{movie.like}</span>
                    </button>

                    <button
                         onClick={handleCommentClick}
                         className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400"
                         aria-label="Comment"
                    >
                         <MessageCircle className="h-5 w-5" />
                         <span className="text-sm">Comment</span>
                    </button>
               </div>

               <div className="flex justify-between items-center mt-4">
                    <Link
                         href={`/movies/${movie?.id}`}
                         className="text-xs font-medium text-red-500 hover:underline dark:text-white"
                    >
                         Watch Now →
                    </Link>

                    <button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-semibold">
                         Buy for ${movie?.price}
                    </button>
               </div>

               {/* Modals */}
               {showCommentModal && <Comment setShowCommentModal={setShowCommentModal} movie={movie} />}

               {showLoginModal && <LoginPrompt setShowLoginModal={setShowLoginModal} action={loginAction} />}
          </div>
     )
}

export default ReusableCard
