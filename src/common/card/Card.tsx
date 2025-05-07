"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MovieCardProps } from "@/types/Movie";
import { Bookmark, Heart, MessageCircle, Play, Star } from "lucide-react";
import Comment from "@/components/ui/core/Modal/Comment";
import { useUser } from "@/context/userContext";
import LoginPrompt from "./LoginPrompt";
import { likeVideo } from "@/service/Like";
import { toast } from "sonner";
import { addWatchList } from "@/service/WatchList";

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
               setLoginAction("like");
               setShowLoginModal(true);
               return;
          }
          const data = {
               videoId: movie.id,
          };
          const res = await addWatchList(data);
          if (res.success) {
               toast.success(res.message);
          }
     };

     const renderStarRating = (rating: number) => {
          const maxVisibleStars = 5;
          const normalizedRating = rating / 2;

          return (
               <div className="flex items-center">
                    {Array.from({ length: maxVisibleStars }).map((_, index) => {
                         const isHalfStar =
                              index < normalizedRating && index + 1 > normalizedRating;
                         const isFullStar = index + 1 <= normalizedRating;

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
                                        <Star
                                             className={`h-4 w-4 ${isFullStar
                                                       ? "text-yellow-500 fill-yellow-500"
                                                       : "text-gray-300"
                                                  }`}
                                        />
                                   )}
                              </div>
                         );
                    })}
                    <span className="ml-2 text-sm font-medium">{rating}/10</span>
               </div>
          );
     };

     return (
          <div
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
               className="flex flex-col h-full justify-between border bg-gradient-to-br from-gray-50/50 to-gray-100/30 dark:from-gray-900 dark:to-gray-900/80 dark:border-white/20 border-black/10 w-full rounded-2xl p-4 overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
               {/* Movie Header */}
               <div className="space-y-3">
                    <div className="flex justify-between items-start">
                         <h2 className="text-xl font-bold text-neutral-800 dark:text-white line-clamp-2">
                              {movie?.title} ({movie?.releaseYear})
                         </h2>
                         <div className="relative transform transition-transform duration-300 scale-100">
                              <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                                   {movie?.rating}
                              </span>
                         </div>
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
                         <div
                              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                                   }`}
                         >
                              <Link
                                   href={`/movies/${movie?.id}`}
                                   className="p-3 bg-white/90 rounded-full hover:bg-white transition-all"
                              >
                                   <Play className="h-6 w-6 text-black" fill="black" />
                              </Link>
                         </div>
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
                         <div>
                              <strong>Rating:</strong>{" "}
                              {renderStarRating(movie?.overallRating || 0)}
                         </div>
                    </div>
               </div>

               {/* Action Buttons */}
               <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                         <button
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
                         </button>

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
                              aria-label={
                                   movie.inWatchList ? "Remove from wishlist" : "Add to wishlist"
                              }
                         >
                              <Bookmark
                                   className={`h-5 w-5 ${movie.inWatchList
                                             ? "fill-yellow-500 text-yellow-500"
                                             : "text-neutral-500 dark:text-neutral-400"
                                        }`}
                              />
                              <span className="text-sm">Wishlist</span>
                         </button>
                    </div>
               </div>

               {/* Modals */}
               {showCommentModal && (
                    <Comment setShowCommentModal={setShowCommentModal} movie={movie} />
               )}
               {showLoginModal && (
                    <LoginPrompt setShowLoginModal={setShowLoginModal} action={loginAction} />
               )}
          </div>
     );
};

export default ReusableCard;
