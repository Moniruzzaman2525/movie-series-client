

import Link from "next/link";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaArrowRight } from "react-icons/fa";
import ReusableCard from "@/common/card/Card";

const TopRatedMovies = () => {
  const data = [
    {
      id: " 1",
      name: "Spaceman",
      img: "https://i.ibb.co.com/z9Z19m6/MV5-BMTg0-NTIz-Mj-Q1-NV5-BMl5-Ban-Bn-Xk-Ft-ZTcw-NDc3-Mz-M5-OQ-V1.jpg",
      rating:7,
      publishedYear: "2024",
      genre: "Comedy",
    },
    {
      id: "2",
      name: "Lunar Echo",
      img: "https://i.ibb.co.com/pjL1M7tk/images.jpg",
      rating: 8,
      publishedYear: '2023',
      genre: "Drama",
      director: "John Doe",
    },
    {
      id: "3",
      name: "Starborn",
      img: "https://i.ibb.co.com/JWxHSPYF/MV5-BNDFk-MTRk-Zm-Qt-M2-I0-NC00-Nj-Jj-LWJl-MDct-NTNi-ZWYx-Yzhj-ZDZi-Xk-Ey-Xk-Fqc-Gc-V1.jpg",
      rating: 6,
      publishedYear:' 2022',
      genre: "Action",
    },
    {
      id: "5",
      name: "Orbit Zero",
      img: "https://i.ibb.co.com/q3r4F40x/099a9b43267653-57e99d9821599.jpg",
      rating: 9,
      publishedYear: "2021",
      genre: "Adventure",
    },
    {
      id: "7",
      name: "Cosmic Drift",
      img: "https://i.ibb.co.com/ycLjmxgF/The-Lord-of-the-Rings-The-Fellowship-of-the-Ring-744631610-large.jpg",
      rating: 5,
      publishedYear: "2020",
      genre: "Drama",
    },
    // {
    //   id: 6,
    //   name: "Galactic Tide",
    //   img: "https://i.ibb.co.com/ycLjmxgF/The-Lord-of-the-Rings-The-Fellowship-of-the-Ring-744631610-large.jpg",
    //   rating: 8,
    //   publishedYear: 2019,
    //   genre: "Action",
    // },
  ];

  return (
    <div className="bg-[#020508]">
      <div className="container mx-auto px-2 md:px-0 py-10">
        <SectionTitle text={"Top Rated Movies"} subText={"Top Rated Movies"} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {data.map((movie, index) => (
                   <ReusableCard
                     key={index}
                     id={movie.id}
                     title={movie.name}
                     thumbnailImage={movie.img}
                     description={`Genre: ${movie.genre}, Rating: ${movie.rating}`}
                     releaseYear={Number(movie.publishedYear)}
                     genre={movie.genre}
                     director={movie.director || "Unknown"} 
                     streamingPlatform={"Unknown"} 
                     price={0} 
                     rating={movie.rating} 
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

export default TopRatedMovies;
