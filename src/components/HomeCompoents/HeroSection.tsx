"use client";
import { FormEvent, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { FiStar, FiClock, FiFile, FiCalendar } from "react-icons/fi";

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      id: 1,
      img: "https://i.ibb.co.com/cX3mRL2q/hero1.jpg",
      title: "Shadows of Tomorrow",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      rating: 4.5,
      time: "2h 30min",
      releaseDate: "2023-06-01",
    },
    {
      id: 2,
      img: "https://i.ibb.co.com/3mR5HS5M/hero2.jpg",
      title: "Shadows of Tomorrow",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      rating: 4.5,
      time: "2h 30min",
      releaseDate: "2023-06-01",
    },
    {
      id: 3,
      img: "https://i.ibb.co.com/1tXrdy6H/images.jpg",
      title: "Shadows of Tomorrow",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
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
    if (typeof index === 'number') {
      setActiveIndex(index);
    }
  
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Carousel
        activeIndex={activeIndex}
        onChange={handleCarouselChange} // Pass the correct index handler
      >
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />

                <div className="absolute top-1/2 left-16 md:left-32 transform -translate-y-1/2 z-20 text-white w-[90%] md:w-1/2">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {item.title}
                  </h1>
                  <p className="text-lg md:text-2xl font-medium mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm md:text-lg mb-6">
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
                  <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white text-lg font-semibold">
                    Watch Now
                  </button>
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
