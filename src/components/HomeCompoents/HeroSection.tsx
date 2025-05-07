"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiStar, FiClock, FiCalendar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
// import 'swiper/swiper.scss';
import 'swiper/css/effect-fade';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const { setSearchQuery: setQuery } = useUser();
  const router = useRouter();

  const movies = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Shadows of Tomorrow",
      description: "A future rewritten. A past uncovered. Discover the truth beyond the shadows.",
      rating: 4.8,
      time: "2h 30min",
      releaseDate: "2023-06-01",
      genre: "Sci-Fi Thriller",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "The Last Horizon",
      description: "When hope fades, the journey begins. Humanity's final stand awaits.",
      rating: 4.9,
      time: "2h 45min",
      releaseDate: "2023-09-15",
      genre: "Epic Adventure",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Crimson Code",
      description: "Beneath the data lies a deadly truth. Decode it before it's too late.",
      rating: 4.7,
      time: "2h 15min",
      releaseDate: "2023-11-03",
      genre: "Cyberpunk Mystery",
    },
  ];

  // Set screen size for animation safety
  useEffect(() => {
    setScreenSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(searchQuery);
    router.push("/movies");
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {screenSize.width > 0 &&
          [...Array(20)].map((_, i) => {
            const x = Math.random() * screenSize.width;
            const y = Math.random() * screenSize.height;
            const size = Math.random() * 10 + 2;
            const opacity = Math.random() * 0.5 + 0.1;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  left: x,
                  top: y,
                  width: size,
                  height: size,
                  opacity,
                }}
                animate={{
                  y: [y, screenSize.height + 100],
                  opacity: [opacity, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
              />
            );
          })}
      </div>

      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full">
              <div className="absolute inset-0">
                <Image
                  src={movie.img}
                  alt={`hero-${index}`}
                  fill
                  className="object-cover"
                  priority
                  quality={100}
                />
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex items-center px-8 md:px-16 lg:px-24">
                <div className="max-w-4xl space-y-6 text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: activeIndex === index ? 0.3 : 0
                      }}
                    >
                      {activeIndex === index && (
                        <>
                          <motion.span
                            className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider text-white bg-red-600 rounded-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {movie.genre}
                          </motion.span>
                          <motion.h1
                            className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {movie.title}
                          </motion.h1>
                          <motion.p
                            className="max-w-2xl text-lg md:text-xl lg:text-2xl text-gray-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            {movie.description}
                          </motion.p>

                          <motion.div
                            className="flex flex-wrap items-center gap-6 mt-6 text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex items-center gap-2">
                              <FiStar className="text-yellow-400 text-xl" />
                              <span className="font-medium">{movie.rating}/5</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiClock className="text-xl" />
                              <span className="font-medium">{movie.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiCalendar className="text-xl" />
                              <span className="font-medium">
                                {new Date(movie.releaseDate).getFullYear()}
                              </span>
                            </div>
                          </motion.div>

                          <motion.div
                            className="flex flex-wrap gap-4 mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                          >
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-8 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
                            >
                              <FaPlay className="text-lg" />
                              Watch Now
                            </motion.button>
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Floating Search Bar */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-full max-w-2xl px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <form
          onSubmit={handleSearch}
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl blur-md opacity-70"
            animate={{
              scale: isHovering ? 1.02 : 1,
              opacity: isHovering ? 0.9 : 0.7,
            }}
          />
          <div className="relative flex items-center bg-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 px-6 py-4 text-lg"
              placeholder="Search for movies, series..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-4 text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default HeroSection;