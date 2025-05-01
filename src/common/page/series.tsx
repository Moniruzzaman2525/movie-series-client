"use client";

import { movies } from "@/fakeData/movie";
import { useState } from "react";
import ReusableCard from "../card/Card";
import { series } from "@/fakeData/series";

const categories = ["All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance"];

const SeriesSearch = () => {
     const [searchTerm, setSearchTerm] = useState("");
     const [selectedCategory, setSelectedCategory] = useState("All");
     const [currentPage, setCurrentPage] = useState(1);

     const itemsPerPage = 6;



     const totalPages = Math.ceil(movies.length / itemsPerPage);
     const paginatedseries = series.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
     );

     const handlePageChange = (page: number) => {
          if (page >= 1 && page <= totalPages) {
               setCurrentPage(page);
          }
     };

     return (
          <div className="w-full max-w-6xl mx-auto p-4">
               {/* Search & Filter */}
               <div className="flex flex-col sm:flex-row gap-4 items-center text-white shadow-md rounded-xl p-4">
                    <input
                         type="text"
                         placeholder="Search series..."
                         value={searchTerm}
                         onChange={(e) => {
                              setSearchTerm(e.target.value);
                              setCurrentPage(1);
                         }}
                         className="flex-1 px-4 py-2 rounded-lg border outline-none border-red-600 transition"
                    />

                    <select
                         value={selectedCategory}
                         onChange={(e) => {
                              setSelectedCategory(e.target.value);
                              setCurrentPage(1);
                         }}
                         className="px-5 py-2 rounded-lg border text-white border-red-600 transition bg-black"
                    >
                         {categories.map((category) => (
                              <option className="bg-black" key={category} value={category}>
                                   {category} series
                              </option>
                         ))}
                    </select>
               </div>

               {/* Movie Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr px-4 py-6">
                    {paginatedseries.map((series, index) => (
                         <ReusableCard key={index} {...series} />
                    ))}
               </div>

               {/* Pagination Controls */}
               {totalPages > 1 && (
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
                                   className={`px-3 py-1 text-sm rounded-md  border-gray-400 ${currentPage === index + 1 ? "bg-red-600 text-white" : "text-white hover:bg-gray-700"
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
