/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useCallback } from "react";

import { MovieCardProps } from "@/types/Movie";
import GenresList from "../card/Filterbar";

import ReusableCard from "../card/Card";
import { getAllContent } from "@/service/content";

const SeriesSearch = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [currentPage, setCurrentPage] = useState(1);
     const [data, setData] = useState<MovieCardProps[]>([]);
     const [category, setCategory] = useState<string | undefined>();
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [Platform, setPlatform] = useState<string | null>(null);
     const [year, setYear] = useState<string | null>(null);
     const [Rating, setRating] = useState<string | null>(null);



     const seERIESData = useCallback(async () => {
          setLoading(true);
          setError(null);
          try {
               const result = await getAllContent(searchTerm, category, Platform, year, Rating);
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
     }, [searchTerm, category, Platform, year, Rating]);

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
          setPlatform(null)
          setRating(null)
          setYear(null)
     };

     return (
          <div className="w-full container mx-auto p-4">
               {/* Search Bar */}
               <div className="flex flex-wrap justify-center gap-4 items-center text-white shadow-md rounded-xl p-4 mb-6 bg-gray-800">
                    {/* Search Input */}
                    <input
                         type="text"
                         placeholder="Search movies..."
                         value={searchTerm}
                         onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                         }}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    />

                    {/* Streaming Platform Filter */}
                    {/* Streaming Platform Filter */}
                    <select
                         value={Platform || ""}
                         onChange={(e) => setPlatform(e.target.value || null)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    >
                         <option value="">All Platforms</option>
                         <option className="text-black" value="Netflix">Netflix</option>
                         <option className="text-black" value="Amazon Prime">Amazon Prime</option>
                         <option className="text-black" value="Disney+">Disney+</option>
                         <option className="text-black" value="Hulu">Hulu</option>
                    </select>

                    {/* Release Year Filter */}
                    <select
                         value={year || ""}
                         onChange={(e) => setYear(e.target.value || null)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    >
                         <option value="">All Years</option>
                         {Array.from({ length: 25 }, (_, i) => {
                              const year = (2025 - i).toString();
                              return (
                                   <option className="text-black" key={year} value={year}>
                                        {year}
                                   </option>
                              );
                         })}
                    </select>

                    {/* Rating Filter */}
                    <select
                         value={Rating || ""}
                         onChange={(e) => setRating(e.target.value || null)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    >
                         <option value="">All Ratings</option>
                         {[...Array(10)].map((_, i) => (
                              <option className="text-black" key={i + 1} value={(i + 1).toString()}>
                                   {i + 1}+
                              </option>
                         ))}
                    </select>

                    {/* Reset Button */}
                    <button
                         onClick={handleReset}
                         className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700"
                    >
                         Reset
                    </button>
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
