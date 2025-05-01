"use client";

import HasselFreeExperience from "@/components/HomeCompoents/HasselFreeExperience";
import HeroSection from "@/components/HomeCompoents/HeroSection";
import TopRatedMovies from "@/components/HomeCompoents/TopRatedMovies";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TopRatedMovies />
      <HasselFreeExperience />
    </div>
  );
};

export default HomePage;
