"use client";
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/Shared/SectionTitle/SectionTitle";
import Link from "next/link";

const AboutUsPage = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-10 text-red-500"
        >
          About Us
        </motion.h1> */}
        <SectionTitle
          text="About Us"
          subText="Curious to learn more? Come join us and be a part of the journey!"
        />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900 p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-300 leading-relaxed">
            We are passionate storytellers and technology enthusiasts dedicated
            to creating the ultimate streaming experience for movie and TV
            lovers. Our platform is home to thousands of handpicked movie
            series, documentaries, and originals you won’t find anywhere else.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-900 p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed">
            Our mission is to connect people with incredible stories from around
            the world. We aim to deliver high-quality entertainment, support
            emerging filmmakers, and continuously push the boundaries of digital
            storytelling.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-900 p-6 rounded-lg shadow-md mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Exclusive original content and series</li>
            <li>Ad-free streaming experience</li>
            <li>Multi-device support</li>
            <li>Affordable subscription plans</li>
            <li>24/7 customer support</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gray-900 p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
          <p className="text-gray-300 leading-relaxed">
            Whether you're a movie lover or a creator, there's a place for you
            here. Discover new favorites, revisit timeless classics, and help us
            shape the future of entertainment.
          </p>
          <div className="flex justify-end">
            <Link href="/login">
              <button className=" border border-neutral-400  text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer">
                Join Now
              </button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUsPage;
