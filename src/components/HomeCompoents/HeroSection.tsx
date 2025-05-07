"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FiStar, FiClock, FiFile, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const {setSearchQuery:setquery}=useUser()
  const naviagated = useRouter()
  const data = [
    {
      id: 1,
      img: "https://i.ibb.co.com/wZYdNTq1/1c30e736-8f80-4ec1-aecf-107fde4e5aad.jpg",
      title: "Shadows of Tomorrow",
      description:
        "A future rewritten. A past uncovered. Discover the truth beyond the shadows.",
      rating: 4.5,
      time: "2h 30min",
      releaseDate: "2023-06-01",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/TBs0HL9B/sl-121019-25870-81.jpg",
      title: "The Last Horizon",
      description:
        " When hope fades, the journey begins. Humanity’s final stand awaits.",
      rating: 4.5,
      time: "2h 30min",
      releaseDate: "2023-06-01",
    },
    {
      id: 3,
      img: "https://i.ibb.co.com/CsVH8hq4/arfan-adytiya-k-SBoif-Y4-RTg-unsplash.jpg",
      title: " Crimson Code",
      description:
        "Beneath the data lies a deadly truth. Decode it before it’s too late.",
      rating: 4.5,
      time: "2h 30min",
      releaseDate: "2023-06-01",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);

  const handleCarouselChange = (index: number | FormEvent<HTMLDivElement>) => {
    if (typeof index === "number") {
      setActiveIndex(index);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setquery(searchQuery)
    naviagated.push('/movies')
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Carousel activeIndex={activeIndex} onChange={handleCarouselChange}>
        <CarouselContent>
          {data.map((item, idx) => (
            <CarouselItem key={idx}>
              <div className="relative h-screen w-full">
                <Image
                  src={item.img}
                  alt={`hero-${idx}`}
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/60 to-transparent z-10" />

                <div className="absolute top-1/2 left-16 md:left-32 transform -translate-y-1/2 z-20 text-white w-[90%] md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                      {item.title}
                    </h1>

                    <p className="text-lg md:text-2xl font-medium mb-4 px-2 lg:px-0">
                      {item.description}
                    </p>
                    <div className="flex flex-col md:flex-row md:items-center gap-6 text-sm md:text-lg mb-6">
                      <div className="flex items-center gap-2">
                        <FiStar className="text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiFile />
                        <span>Popular</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar />
                        <span>{new Date(item.releaseDate).getFullYear()}</span>
                      </div>
                    </div>
                  </motion.div>
                  {/* Search Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="my-20 w-full  flex items-center ">
                      <form
                        onSubmit={handleSearch}
                        className="flex items-center bg-white/20 rounded-md overflow-hidden px-2 py-1 "
                      >
                        <input
                          type="text"
                          className="bg-transparent outline-none  text-white placeholder-white/80 px-2 py-1"
                          placeholder="Search movies..."
                          value={searchQuery}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                          }
                        />
                        <button type="submit" className="bg-red-500 py-2 px-2 text-white rounded-xl cursor-pointer">
                          {/* <FiSearch className="text-white text-xl" /> */}
                           Search
                        </button>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeroSection;
