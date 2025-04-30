"use client";

import HeroSection from "@/components/HomeCompoents/HeroSection";
import TopRatedMovies from "@/components/HomeCompoents/TopRatedMovies";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TopRatedMovies />
      <h1> Home</h1>
    </div>
  );
};

export default HomePage;
