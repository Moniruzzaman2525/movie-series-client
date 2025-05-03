"use client";

import EditorsPick from "@/components/HomeCompoents/EditorsPick";
import FaqSection from "@/components/HomeCompoents/FaqSection";
import HasselFreeExperience from "@/components/HomeCompoents/HasselFreeExperience";
import HeroSection from "@/components/HomeCompoents/HeroSection";
// import { ThreeDMarqueeDemo } from "@/components/HomeCompoents/Marquee";
import NewlyAdded from "@/components/HomeCompoents/NewlyAdded";
import { AnimatedTestimonialsDemo } from "@/components/HomeCompoents/Testimonials";
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
      {/* <ThreeDMarqueeDemo/> */}
      <FaqSection />
      <AnimatedTestimonialsDemo />
    </div>
  );
};

export default HomePage;
