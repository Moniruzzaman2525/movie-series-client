"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieCardProps } from "@/types/Movie";

const ReusableCard = ({ movie }: { movie: MovieCardProps }) => {
     return (
          <div className="flex flex-col h-full justify-between border bg-gray-50 dark:bg-black dark:border-white/20 border-black/10 w-full \ rounded-xl p-3 overflow-hidden shadow hover:shadow-lg transition-shadow">

               {/* Top Section */}
               <div className="space-y-3">
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                         {movie?.title} ({movie?.releaseYear})
                    </h2>

                    <p className="text-neutral-500 text-sm dark:text-neutral-300 line-clamp-3">
                         {movie?.description}
                    </p>

                    <div className="relative w-full h-40 rounded-xl overflow-hidden">
                         <Image
                              src={movie?.thumbnailImage || ""}
                              alt={movie?.title || "image"}
                              fill
                              className="object-cover transition"
                         />
                    </div>

                    <div className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                         <p><strong>Genre:</strong> {movie?.genre}</p>
                         <p><strong>Director:</strong> {movie?.director}</p>
                         <p><strong>Platform:</strong> {movie?.streamingPlatform}</p>
                         <p><strong>Price:</strong> ${movie?.price}</p>
                         <p><strong>Rating:</strong> ⭐ {movie?.rating}</p>
                    </div>
               </div>

               {/* Bottom Section */}
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
          </div>
     );
};

export default ReusableCard;
