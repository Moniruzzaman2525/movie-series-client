"use client";

import EditorsPick from "@/components/HomeCompoents/EditorsPick";
import HasselFreeExperience from "@/components/HomeCompoents/HasselFreeExperience";
import HeroSection from "@/components/HomeCompoents/HeroSection";
import NewlyAdded from "@/components/HomeCompoents/NewlyAdded";
import TopRatedMovies from "@/components/HomeCompoents/TopRatedMovies";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TopRatedMovies />
      <HasselFreeExperience />
      <NewlyAdded />
      <EditorsPick />
    </div>
  );
};

export default HomePage;
