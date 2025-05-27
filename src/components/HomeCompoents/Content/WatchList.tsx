"use client"
import ReusableCard from "@/common/card/Card"
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Plus } from "lucide-react"
import type { IMovie } from "@/types/Movie"

interface NewlyAddedProps {
    data: IMovie[]
}

const WatchList = ({ data }: NewlyAddedProps) => {
    const limitedData = data?.slice(0, 10)
    const isEmpty = !limitedData || limitedData.length === 0

    return (
        <div className="bg-[#020508]">
            <div className="container mx-auto px-2 md:px-0 py-10">
                <SectionTitle text={"Your Wishlist"} subText={""} />

                {isEmpty ? (
                    <div className="flex justify-center items-center min-h-[700px]">
                        <Card className="bg-gray-900/50 border-gray-800 border-dashed border-2 hover:border-gray-700 transition-colors max-w-md w-full mx-4">
                            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                                    <Heart className="w-12 h-12 text-gray-600" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-300 mb-4">Your Wishlist is Empty</h3>
                                <p className="text-gray-500 text-base mb-6 max-w-[280px] leading-relaxed">
                                    Start adding movies to your wishlist to see them here. Discover amazing films and keep track of what
                                    you want to watch.
                                </p>
                                <div className="flex items-center gap-3 text-gray-600 text-sm bg-gray-800/50 px-4 py-2 rounded-full">
                                    <Plus className="w-5 h-5" />
                                    <span>Add your first movie</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {limitedData?.map((movie) => (
                            <ReusableCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default WatchList
