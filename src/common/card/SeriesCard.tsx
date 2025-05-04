"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { MovieCardProps } from "@/types/Movie";
import Link from "next/link";

const SeriesCard = ({
     title,
     genre,
     thumbnailImage,
     description,
     releaseYear,
     director,
     streamingPlatform,
     price,
     rating,
     id
}: MovieCardProps) => {
     return (
          <CardContainer className="inter-var">
               <CardBody className="flex flex-col justify-between bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full  rounded-xl p-3  ">
                    <div>
                         <CardItem
                              translateZ="50"
                              className="text-xl font-bold text-neutral-800 dark:text-white"
                         >
                              {title} ({releaseYear})
                         </CardItem>

                         <CardItem
                              as="p"
                              translateZ="60"
                              className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 line-clamp-3"
                         >
                              {description}
                         </CardItem>

                         <CardItem translateZ="80" className="mt-4 w-full">
                              <Image
                                   height={200}
                                   width={300}
                                   src={thumbnailImage}
                                   alt={title}
                                   className="h-44 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                              />
                         </CardItem>

                         <div className="mt-4 space-y-1 text-sm text-neutral-600 dark:text-neutral-300">
                              <p>
                                   <strong>Genre:</strong> {genre}
                              </p>
                              <p>
                                   <strong>Director:</strong> {director}
                              </p>
                              <p>
                                   <strong>Platform:</strong> {streamingPlatform}
                              </p>
                              <p>
                                   <strong>Price:</strong> ${price}
                              </p>
                              <p>
                                   <strong>Rating:</strong> ⭐ {rating}
                              </p>
                         </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                         <CardItem
                              translateZ={20}
                              className="px-4 py-2 rounded-xl text-xs font-medium dark:text-white"

                         >
                              <Link href={`/series/${id}`}>Watch Now →</Link>

                         </CardItem>

                         <CardItem
                              translateZ={20}
                              as="button"
                              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-semibold"
                         >
                              Buy for ${price}
                         </CardItem>
                    </div>
               </CardBody>
          </CardContainer>
     );
};

export default SeriesCard;
