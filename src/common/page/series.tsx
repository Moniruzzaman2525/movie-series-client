/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";

import { MovieCardProps } from "@/types/Movie";
import GenresList from "../card/Filterbar";
import { getAllContent } from "@/service/Content";
import ReusableCard from "../card/Card";

const SeriesSearch = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
     const [data, setData] = useState<MovieCardProps[]>([]);
     const [category, setCategory] = useState<string | undefined>();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);



     const seERIESData = useCallback(async () => {
          setLoading(true);
          setError(null);
          try {
               const result = await getAllContent(searchTerm, category);
               if (result?.data) {
                    const filterSeries = result.data.filter(
                         (movie: MovieCardProps) => movie.category === "SERIES"
                    );
                    setData(filterSeries);
               } else {
                    setData([]);
               }
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: any) {
               console.error(err);
               setError("Failed to fetch movies.");
               setData([]);
          } finally {
               setLoading(false);
          }
     }, [searchTerm, category]);

     useEffect(() => {
          seERIESData();
     }, [seERIESData]);


     const itemsPerPage = 6;
     const totalPages = Math.ceil(data.length / itemsPerPage);
     const paginatedMovies = data.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
     );

     const handlePageChange = (page: number) => {
          if (page >= 1 && page <= totalPages) {
               setCurrentPage(page);
          }
     };


     const handleReset = () => {
          setCategory(undefined);
          setSearchTerm("");
          setCurrentPage(1);
     };

     return (
          <div className="w-full container mx-auto p-4">
               {/* Search Bar */}
               <div className="flex justify-center gap-3 items-center text-white shadow-md rounded-xl p-4 mb-6">
                    <input
                         type="text"
                         placeholder="Search series..."
                         value={searchTerm}
                         onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                         }}
                         className="w-1/2 px-4 py-2 rounded-lg border outline-none border-red-600 transition"
                    />
                    <div className="flex justify-center ">
                         <button
                              onClick={handleReset}
                              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                         >
                              Reset
                         </button>
                    </div>
               </div>

               {/* Filter + Movie Grid */}
               <div className="flex flex-col md:flex-row justify-center gap-6">
                    {/* Sidebar */}
                    <div className="w-[200px]">
                         <GenresList selectedGenre={category} setCatgory={setCategory} />
                    </div>

                    {/* Movie Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[200px] flex-1">
                         {loading && (
                              <div className="col-span-full flex flex-col items-center justify-center w-full">
                                   <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
                                   <p className="text-white mt-4">Loading series...</p>
                              </div>
                         )}

                         {error && !loading && (
                              <div className="col-span-full text-center text-red-400 mt-8">
                                   <img
                                        src="https://i.ibb.co/com/cSDr6Tz9/2953962.jpg"
                                        alt="Error"
                                        className="w-40 mx-auto mb-4"
                                   />
                                   <p className="text-lg font-semibold">Oops! Something went wrong.</p>
                                   <p className="text-sm text-gray-400">Please try again later.</p>
                              </div>
                         )}

                         {!loading && !error && paginatedMovies.length === 0 && (
                              <div className="col-span-full text-center text-gray-300 mt-8">
                                   <img
                                        src="https://i.ibb.co/com/cSDr6Tz9/2953962.jpg"
                                        alt="No Data"
                                        className="w-40 mx-auto mb-4"
                                   />
                                   <p className="text-lg font-semibold">No series found</p>
                                   <p className="text-sm text-gray-400">Try a different search or genre.</p>
                              </div>
                         )}

                         {!loading && !error &&
                              paginatedMovies.map((movie, index) => (
                                   <div key={index}>
                                        <ReusableCard movie={movie} />
                                   </div>
                              ))}
                    </div>
               </div>



               {/* Pagination */}
               {totalPages > 1 && !loading && !error && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                         <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="px-3 py-1 text-sm rounded-md border border-gray-400 text-white hover:bg-red-600 disabled:opacity-30"
                         >
                              Prev
                         </button>

                         {[...Array(totalPages)].map((_, index) => (
                              <button
                                   key={index + 1}
                                   onClick={() => handlePageChange(index + 1)}
                                   className={`px-3 py-1 text-sm rounded-md border-gray-400 ${currentPage === index + 1
                                        ? "bg-red-600 text-white"
                                        : "text-white hover:bg-gray-700"
                                        }`}
                              >
                                   {index + 1}
                              </button>
                         ))}

                         <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className="px-3 py-1 text-sm rounded-md border border-gray-400 text-white hover:bg-red-600 disabled:opacity-30"
                         >
                              Next
                         </button>
                    </div>
               )}
          </div>
     );
};

export default SeriesSearch;
