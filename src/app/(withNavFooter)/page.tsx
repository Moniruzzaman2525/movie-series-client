import EditorsPick from "@/components/HomeCompoents/EditorsPick";
import FaqSection from "@/components/HomeCompoents/FaqSection";
import HasselFreeExperience from "@/components/HomeCompoents/HasselFreeExperience";
import NewlyAdded from "@/components/HomeCompoents/NewlyAdded";
import { AnimatedTestimonialsDemo } from "@/components/HomeCompoents/Testimonials";
import HeroSection from "@/components/HomeCompoents/HeroSection";
import TopRatedMoviesPage from "@/components/HomeCompoents/TopRatedMoviesPage";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TopRatedMoviesPage />
      <HasselFreeExperience />
      <NewlyAdded />
      <EditorsPick />
      <FaqSection />
      <AnimatedTestimonialsDemo />
    </div>
  );
};

export default HomePage;
