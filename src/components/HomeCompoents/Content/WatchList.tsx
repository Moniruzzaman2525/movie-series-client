"use client"
import ReusableCard from "@/common/card/Card";

import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";
import { IMovie } from "@/types/Movie";



interface NewlyAddedProps {
    data: IMovie[];
}

const WatchList = ({ data }: NewlyAddedProps) => {

    const limitedData = data?.slice(0, 10);
    return (
        <div className="bg-[#020508]">
            <div className="container mx-auto px-2 md:px-0 py-10">
                <SectionTitle text={"Your Wishlist"} subText={""} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {limitedData?.map((movie) => (
                        <ReusableCard
                            movie={movie}
                            key={movie.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WatchList;
