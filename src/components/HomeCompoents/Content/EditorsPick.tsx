"use client"
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ReusableCard from "@/common/card/Card";
import { MovieCardProps } from "@/types/Movie";
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";

interface EditorsPickProps {
  data: MovieCardProps[];
}

const EditorsPick = ({ data }: EditorsPickProps) => {

  const limitedData = data?.slice(0, 5);
  return (
    <div className="bg-[#020508]">
      <div className="container mx-auto px-2 md:px-0 py-10">
        <SectionTitle text={"Editor Pick Movies"} subText={"Editor Pick Movies"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {limitedData?.map((movie) => (
            <ReusableCard
              movie={movie}
              key={movie.id}
            />
          ))}
        </div>
        <div className="flex justify-end ">
          <Link href="/movies">
            <button className="flex items-center gap-1 text-white  px-4 py-2 ">
              See All <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditorsPick;
