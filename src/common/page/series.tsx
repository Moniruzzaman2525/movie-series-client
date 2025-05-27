"use client"

import { useEffect, useState } from "react"
import ReusableCard from "../card/Card"
import GenresList from "../card/Filterbar"
import { useUser } from "@/context/userContext"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import type { IMovie } from "@/types/Movie"

export interface Meta {
     page: number
     limit: number
     total: number
}

export interface VideoResponse {
     meta: Meta
     data: IMovie[]
}

const MovieSearch = ({ moviesData }: { moviesData: VideoResponse }) => {
     const { searchQuery } = useUser()
     const router = useRouter()
     const searchParams = useSearchParams()
     const [searchTerm, setSearchTerm] = useState(searchQuery)
     const [currentPage, setCurrentPage] = useState(1)
     const [category, setCategory] = useState<string | undefined>()
     const [Platform, setPlatform] = useState<string | null>(null)
     const [year, setYear] = useState<string | null>(null)
     const [Rating, setRating] = useState<string | null>(null)

     useEffect(() => {
          const params = new URLSearchParams(searchParams.toString())
          setSearchTerm(params.get("search") || "")
          setCategory(params.get("category") || undefined)
          setCurrentPage(Number.parseInt(params.get("page") || "1"))
          setPlatform(params.get("platform") || null)
          setYear(params.get("year") || null)
          setRating(params.get("rating") || null)
     }, [searchParams])

     const updateSearchParams = (newParams: Record<string, string | null | undefined>) => {
          const params = new URLSearchParams(searchParams.toString())

          Object.entries(newParams).forEach(([key, value]) => {
               if (value !== null && value !== undefined && value !== "") {
                    params.set(key, value)
               } else {
                    params.delete(key)
               }
          })

          router.push(`?${params.toString()}`)
     }

     const handleSearchChange = (value: string) => {
          setSearchTerm(value)
          setCurrentPage(1)
          updateSearchParams({ search: value, page: "1" })
     }

     const handlePageChange = (page: number) => {
          if (page >= 1 && page <= moviesData?.meta?.total) {
               updateSearchParams({ page: page.toString() })
          }
     }

     const handleFilterChange = (filterType: "category" | "platform" | "year" | "rating", value: string | null) => {
          switch (filterType) {
               case "category":
                    setCategory(value || undefined)
                    updateSearchParams({ category: value, page: "1" })
                    break
               case "platform":
                    setPlatform(value)
                    updateSearchParams({ platform: value, page: "1" })
                    break
               case "year":
                    setYear(value)
                    updateSearchParams({ year: value, page: "1" })
                    break
               case "rating":
                    setRating(value)
                    updateSearchParams({ rating: value, page: "1" })
                    break
          }
          setCurrentPage(1)
     }

     const handleReset = () => {
          setSearchTerm("")
          setCategory(undefined)
          setCurrentPage(1)
          setPlatform(null)
          setRating(null)
          setYear(null)
          updateSearchParams({
               search: null,
               category: null,
               page: null,
               platform: null,
               year: null,
               rating: null,
          })
     }

     const totalPage = Math.ceil(moviesData?.meta?.total / moviesData?.meta?.limit)
     const hasActiveFilters = searchTerm || category || Platform || year || Rating

     return (
          <div className="w-full container mx-auto p-4">
               <div className="flex flex-wrap justify-center gap-4 items-center text-white shadow-md rounded-xl p-4 mb-6 bg-gray-800">
                    <input
                         type="text"
                         placeholder="Search movies..."
                         value={searchTerm}
                         onChange={(e) => handleSearchChange(e.target.value)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    />
                    <select
                         value={Platform || ""}
                         onChange={(e) => handleFilterChange("platform", e.target.value || null)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    >
                         <option value="">All Platforms</option>
                         <option className="text-black" value="NETFLIX">
                              Netflix
                         </option>
                         <option className="text-black" value="DISNEY">
                              Disney
                         </option>
                         <option className="text-black" value="HBO">
                              Hbo
                         </option>
                         <option className="text-black" value="AMAZON">
                              Amazon Prime
                         </option>
                         <option className="text-black" value="APPLE">
                              Apple
                         </option>
                         <option className="text-black" value="YOUTUBE">
                              Youtube
                         </option>
                         <option className="text-black" value="SPOTIFY">
                              Spotify
                         </option>
                    </select>

                    <select
                         value={year || ""}
                         onChange={(e) => handleFilterChange("year", e.target.value || null)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    >
                         <option value="">All Years</option>
                         {Array.from({ length: 25 }, (_, i) => {
                              const y = (2025 - i).toString()
                              return (
                                   <option className="text-black" key={y} value={y}>
                                        {y}
                                   </option>
                              )
                         })}
                    </select>

                    <select
                         value={Rating || ""}
                         onChange={(e) => handleFilterChange("rating", e.target.value || null)}
                         className="px-4 py-2 rounded-lg border outline-none border-red-600 transition w-52"
                    >
                         <option value="">All Ratings</option>
                         {[...Array(10)].map((_, i) => (
                              <option className="text-black" key={i + 1} value={(i + 1).toString()}>
                                   {i + 1}+
                              </option>
                         ))}
                    </select>

                    <button
                         onClick={handleReset}
                         className="px-4 py-2 bg-red-600 text-white rounded-md cursor-pointer hover:bg-red-700"
                    >
                         Reset
                    </button>
               </div>

               <div className="flex flex-col md:flex-row justify-center gap-6">
                    <div className="w-[200px]">
                         <GenresList
                              selectedGenre={category}
                              setCatgory={(val) => handleFilterChange("category", typeof val === "function" ? null : (val ?? null))}
                         />
                    </div>

                    {moviesData?.data?.length === 0 ? (
                         <div className="flex-1 flex justify-center items-center min-h-[600px]">
                              <Card className="bg-gray-900/50 border-gray-800 border-dashed border-2 hover:border-gray-700 transition-colors max-w-md w-full mx-4">
                                   <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                        <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                                             {hasActiveFilters ? (
                                                  <Filter className="w-12 h-12 text-gray-600" />
                                             ) : (
                                                  <Search className="w-12 h-12 text-gray-600" />
                                             )}
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                                             {hasActiveFilters ? "No Results Found" : "Start Your Movie Discovery"}
                                        </h3>
                                        <p className="text-gray-500 text-base mb-6 max-w-[280px] leading-relaxed">
                                             {hasActiveFilters
                                                  ? "No movies match your current search criteria. Try adjusting your filters or search terms to find what you're looking for."
                                                  : "Use the search bar and filters above to explore our movie collection. Search by title, genre, platform, year, or rating to find your next favorite film."}
                                        </p>
                                        {hasActiveFilters && (
                                             <button
                                                  onClick={handleReset}
                                                  className="flex items-center gap-3 text-gray-300 text-sm bg-red-600/20 hover:bg-red-600/30 px-4 py-2 rounded-full border border-red-600/30 transition-colors"
                                             >
                                                  <Filter className="w-4 h-4" />
                                                  <span>Clear All Filters</span>
                                             </button>
                                        )}
                                   </CardContent>
                              </Card>
                         </div>
                    ) : (
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[200px] flex-1">
                              {moviesData?.data?.map((movie, index) => (
                                   <ReusableCard key={index} movie={movie} />
                              ))}
                         </div>
                    )}
               </div>

               {moviesData?.data?.length > 0 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                         <button
                              onClick={() => handlePageChange(currentPage - 1)}
                              disabled={currentPage === 1}
                              className="px-3 py-1 text-sm rounded-md border border-gray-400 text-white hover:bg-red-600 disabled:opacity-30"
                         >
                              Prev
                         </button>
                         {[...Array(totalPage)].map((_, index) => (
                              <button
                                   key={index + 1}
                                   onClick={() => handlePageChange(index + 1)}
                                   className={`px-3 py-1 text-sm rounded-md border-gray-400 ${currentPage === index + 1 ? "bg-red-600 text-white" : "text-white hover:bg-gray-700"
                                        }`}
                              >
                                   {index + 1}
                              </button>
                         ))}
                         <button
                              onClick={() => handlePageChange(currentPage + 1)}
                              disabled={moviesData?.meta?.page === moviesData?.meta?.total}
                              className="px-3 py-1 text-sm rounded-md border border-gray-400 text-white hover:bg-red-600 disabled:opacity-30"
                         >
                              Next
                         </button>
                    </div>
               )}
          </div>
     )
}

export default MovieSearch
