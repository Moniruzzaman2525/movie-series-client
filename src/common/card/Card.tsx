"use client";

<<<<<<< HEAD
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MovieCardProps } from "@/types/Movie";
import { Heart, MessageCircle,  Play, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Comment from "@/components/ui/core/Modal/Comment";
import { useUser } from "@/context/userContext";
import LoginPrompt from "./LoginPrompt";
import { likeVideo } from "@/service/Like";
import { toast } from "sonner";
=======
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { MovieCardProps } from "@/types/Movie"
import { Bookmark, Heart, MessageCircle, Star } from "lucide-react"
import Comment from "@/components/ui/core/Modal/Comment"
import { useUser } from "@/context/userContext"
import LoginPrompt from "./LoginPrompt"
import { likeVideo } from "@/service/Like"
import { toast } from "sonner"
import { addWatchList } from "@/service/WatchList"
>>>>>>> ff5aeec854b4bf86e073e82a7d8fe9f98abd5431

const ReusableCard = ({ movie }: { movie: MovieCardProps }) => {
     const { user } = useUser();
     const [showCommentModal, setShowCommentModal] = useState(false);
     const [showLoginModal, setShowLoginModal] = useState(false);
     const [loginAction, setLoginAction] = useState<"like" | "comment">("like");
     const [likeLoading, setLikeLoading] = useState(false);
     const [isHovered, setIsHovered] = useState(false);

     const handleLikeToggle = async () => {
          if (!user) {
               setLoginAction("like");
               setShowLoginModal(true);
               return;
          }

          setLikeLoading(true);
          try {
               const data = {
                    videoId: movie.id,
               };
               const res = await likeVideo(data);

               if (res.success) {
                    toast.success(res.message);
               }
          } catch (err) {
               console.error("Like toggle failed", err);
          } finally {
               setLikeLoading(false);
          }
     };

     const handleCommentClick = () => {
          if (!user) {
               setLoginAction("comment");
               setShowLoginModal(true);
               return;
          }
          setShowCommentModal(true);
     };


     const handleWishlistToggle = async () => {
          if (!user) {
               setLoginAction("like")
               setShowLoginModal(true)
               return
          }
          const data = {
               videoId: movie.id
          }
          const res = await addWatchList(data)
          if (res.success) {
               toast.success(res.message)
          }

     }

     const renderStarRating = (rating: number) => {
          const maxVisibleStars = 5

          const normalizedRating = rating / 2

          return (
               <div className="flex items-center">
                    {Array.from({ length: maxVisibleStars }).map((_, index) => {

                         const isHalfStar = index < normalizedRating && index + 1 > normalizedRating

                         const isFullStar = index + 1 <= normalizedRating

                         return (
                              <div key={index} className="relative">
                                   {isHalfStar ? (

                                        <div className="relative">
                                             <Star className="h-4 w-4 text-gray-300" />
                                             <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                             </div>
                                        </div>
                                   ) : (

                                        <Star className={`h-4 w-4 ${isFullStar ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                                   )}
                              </div>
                         )
                    })}
                    <span className="ml-2 text-sm font-medium">{rating}/10</span>
               </div>
          )
     }


     return (
          <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               whileHover={{ scale: 1.02 }}
               transition={{ type: "spring", stiffness: 400, damping: 15 }}
               onHoverStart={() => setIsHovered(true)}
               onHoverEnd={() => setIsHovered(false)}
               className="flex flex-col h-full justify-between border bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-900 dark:to-gray-900/80 dark:border-white/20 border-black/10 w-full rounded-2xl p-4 overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
               {/* Movie Header */}
               <div className="space-y-3">
                    <div className="flex justify-between items-start">
                         <h2 className="text-xl font-bold text-neutral-800 dark:text-white line-clamp-2">
                              {movie?.title} ({movie?.releaseYear})
                         </h2>
                         <motion.div
                              animate={{ scale: isHovered ? 1.1 : 1 }}
                              transition={{ type: "spring" }}
                              className="relative"
                         >
                              <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                                   {movie?.rating}
                              </span>
                         </motion.div>
                    </div>

                    <p className="text-neutral-500 text-sm dark:text-neutral-300 line-clamp-3">
                         {movie?.description}
                    </p>

                    {/* Image with Play Button Overlay */}
                    <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                         <Image
                              src={movie?.thumbnailImage || "/placeholder-movie.jpg"}
                              alt={movie?.title || "Movie thumbnail"}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                         />
                         <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: isHovered ? 1 : 0 }}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity"
                         >
                              <Link
                                   href={`/movies/${movie?.id}`}
                                   className="p-3 bg-white/90 rounded-full hover:bg-white transition-all"
                              >
                                   <Play className="h-6 w-6 text-black" fill="black" />
                              </Link>
                         </motion.div>
                    </div>

<<<<<<< HEAD
                    {/* Movie Details */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                         <div className="flex items-center gap-1">
                              <span className="font-semibold">Genre:</span>
                              <span className="truncate">{movie?.genre}</span>
                         </div>
                         <div className="flex items-center gap-1">
                              <span className="font-semibold">Director:</span>
                              <span className="truncate">{movie?.director}</span>
                         </div>
                         <div className="flex items-center gap-1">
                              <span className="font-semibold">Platform:</span>
                              <span className="truncate">{movie?.streamingPlatform}</span>
                         </div>
                         <div className="flex items-center gap-1">
                              <span className="font-semibold">Price:</span>
                              <span className="text-green-600 dark:text-green-400 font-bold">
                                   ${movie?.price}
                              </span>
=======
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
                         <div>
                              <strong>Rating:</strong> {renderStarRating(movie?.overallRating || 0)}
>>>>>>> ff5aeec854b4bf86e073e82a7d8fe9f98abd5431
                         </div>
                    </div>
               </div>

               {/* Action Buttons */}
               <div className="mt-4 space-y-3">
                    {/* Like & Comment */}
                    <div className="flex items-center justify-between">
                         <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={handleLikeToggle}
                              disabled={likeLoading}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200/50 dark:bg-gray-800 hover:bg-gray-300/50 dark:hover:bg-gray-700 transition-colors"
                              aria-label={movie.liked ? "Unlike" : "Like"}
                         >
                              <Heart
                                   className={`h-5 w-5 ${movie.liked
                                             ? "fill-red-500 text-red-500 animate-pulse"
                                             : "text-neutral-500 dark:text-neutral-400"
                                        }`}
                              />
                              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                   {movie.like}
                              </span>
                         </motion.button>

<<<<<<< HEAD
                         <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={handleCommentClick}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200/50 dark:bg-gray-800 hover:bg-gray-300/50 dark:hover:bg-gray-700 transition-colors"
                              aria-label="Comment"
                         >
                              <MessageCircle className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                   Comment
                              </span>
                         </motion.button>
                    </div>

                    {/* Watch Now & Buy */}
                    <div className="flex items-center justify-between gap-2">
                         <Link
                              href={`/movies/${movie?.id}`}
                              className="flex items-center justify-center gap-1 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                         >
                              <Play className="h-4 w-4 text-white" />
                              <span className="text-sm text-white font-semibold">Watch Now</span>
                         </Link>

                         <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-red-500/30 transition-all"
                         >
                              <ShoppingCart className="h-4 w-4" />
                              <span className="text-sm">${movie?.price}</span>
                         </motion.button>
                    </div>
=======
                    <button
                         onClick={handleCommentClick}
                         className="flex items-center gap-1 cursor-pointer text-neutral-500 dark:text-neutral-400"
                         aria-label="Comment"
                    >
                         <MessageCircle className="h-5 w-5" />
                         <span className="text-sm">{movie.totalComments} Comment</span>
                    </button>
                    <button
                         onClick={handleWishlistToggle}
                         className="flex items-center gap-1 cursor-pointer text-neutral-500 dark:text-neutral-400"
                         aria-label={movie.inWatchList ? "Remove from wishlist" : "Add to wishlist"}
                    >
                         <Bookmark
                              className={`h-5 w-5 ${movie.inWatchList ? "fill-yellow-500 text-yellow-500" : "text-neutral-500 dark:text-neutral-400"}`}
                         />
                         <span className="text-sm">Wishlist</span>
                    </button>
>>>>>>> ff5aeec854b4bf86e073e82a7d8fe9f98abd5431
               </div>

               {/* Modals */}
               {showCommentModal && (
                    <Comment setShowCommentModal={setShowCommentModal} movie={movie} />
               )}
               {showLoginModal && (
                    <LoginPrompt setShowLoginModal={setShowLoginModal} action={loginAction} />
               )}
          </motion.div>
     );
};

export default ReusableCard;