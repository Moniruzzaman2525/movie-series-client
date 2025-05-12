"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WiStars } from "react-icons/wi";
import { FaGlobe, FaWifi, FaShieldAlt } from "react-icons/fa";

const HasselFreeExperience = () => {
  const features = [
    {
      icon: <FaGlobe className="text-5xl text-purple-400" />,
      title: "Access while traveling",
      description: "Enjoy unlimited streaming across 100+ countries with no regional restrictions. Your favorite content follows you everywhere.",
      animation: { y: -40 }
    },
    {
      icon: <FaWifi className="text-5xl text-blue-400" />,
      title: "Stream with no interruptions",
      description: "Our proprietary StreamBoost™ technology ensures 4K Ultra HD streaming with zero buffering, even during peak hours.",
      animation: { y: -30 }
    },
    {
      icon: <FaShieldAlt className="text-5xl text-green-400" />,
      title: "Stay secure at all times",
      description: "Military-grade encryption protects your viewing activity and personal data on any network, anywhere.",
      animation: { y: -20 }
    }
  ];

  return (
    <div className="relative bg-black py-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-900 rounded-full filter blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900 rounded-full filter blur-[100px]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20"
          >
            <Image
              src="https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Streaming on multiple devices"
              width={1200}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-2"
              >
                <WiStars className="text-4xl text-yellow-400" />
                <span className="text-xl font-bold text-white">4.9/5 Rated Streaming Platform</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content section */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                The ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">hassle-free</span> streaming experience
              </h1>
              <p className="mt-4 text-xl text-gray-300">
                Designed for viewers who demand perfection in every frame
              </p>
            </motion.div>

            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, ...feature.animation }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-6 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-3 rounded-lg bg-gray-800/50">
                    {feature.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{feature.title}</h2>
                    <p className="text-lg text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <button className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-lg hover:from-red-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                Start Your Free Trial
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasselFreeExperience;