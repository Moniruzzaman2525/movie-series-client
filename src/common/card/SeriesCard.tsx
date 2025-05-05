"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SeriesCard = ({ series }: { series: any }) => {
     return (
          <div className="flex flex-col justify-between bg-gray-50 relative dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/20 border border-black/10 w-full  rounded-xl p-3 overflow-hidden shadow hover:shadow-lg transition-shadow">

               <div>
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-white">
                         {series.title} ({series.releaseYear})
                    </h2>

                    <p className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 line-clamp-3">
                         {series.description}
                    </p>

                    <div className="mt-4 w-full">
                         <Image
                              height={200}
                              width={300}
                              src={series.thumbnailImage}
                              alt={series.title}
                              className="h-44 w-full object-cover rounded-xl transition group-hover:shadow-xl"
                         />
                    </div>

                    <div className="mt-4 space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                         <p><strong>Genre:</strong> {series.genre}</p>
                         <p><strong>Director:</strong> {series.director}</p>
                         <p><strong>Platform:</strong> {series.streamingPlatform}</p>
                         <p><strong>Price:</strong> ${series.price}</p>
                         <p><strong>Rating:</strong> ⭐ {series.rating}</p>
                    </div>
               </div>

               <div className="flex justify-between items-center mt-6">
                    <Link
                         href={`/series/${series.id}`}
                         className="px-4 py-2 rounded-xl text-xs font-medium text-red-500 hover:underline dark:text-white"
                    >
                         Watch Now →
                    </Link>

                    <button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-semibold">
                         Buy for ${series.price}
                    </button>
               </div>
          </div>
     );
};

export default SeriesCard;
