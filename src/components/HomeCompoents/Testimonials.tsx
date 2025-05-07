"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CiStar } from "react-icons/ci";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "StreamVista's 4K quality blew me away - it's like having a cinema in my living room. The personalized recommendations are scarily accurate!",
      name: "Sarah Chen",
      designation: "Movie Buff & Binge-Watcher",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
    },
    {
      quote:
        "The simultaneous streaming on multiple devices saved family movie night. Kids in their rooms, parents in the living room - everyone happy!",
      name: "Michael Rodriguez",
      designation: "Family Plan Subscriber",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 4,
    },
    {
      quote:
        "As a film student, I appreciate the vast collection of classic cinema and international films. The curated collections are a goldmine!",
      name: "Emily Watson",
      designation: "Film Student & Critic",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
    },
  
   
  ];

  return (
    <div className="relative py-16 bg-black sm:py-20 lg:py-28 overflow-hidden">
      {/* Cinematic background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/30 to-black/80"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500 rounded-full filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[100px] opacity-10"></div>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            What Our Streamers Say
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-xl text-gray-300">
            Join millions of happy viewers enjoying unlimited entertainment
          </p>
        </motion.div>

        {/* Testimonials Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-gradient-to-r from-gray-900 to-gray-800  border-gray-700  text-white border p-6 rounded-xl shadow-xl"
            >
              <div className="flex items-center justify-center mb-4">
                <Image
                  height={100}
                  width={100}
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <p className="text-lg text-white">{testimonial.quote}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-white">{testimonial.designation}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <CiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center justify-center mt-20 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-12"
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <CiStar
                  key={i}
                  className="w-8 h-8 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="mt-2 text-lg font-medium text-gray-300">
              4.8/5 Average Rating
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              10M+
            </p>
            <p className="mt-2 text-lg font-medium text-gray-300">
              Happy Subscribers
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              100K+
            </p>
            <p className="mt-2 text-lg font-medium text-gray-300">
              Titles Available
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
