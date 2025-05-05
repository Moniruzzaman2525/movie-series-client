import EditorsPick from "@/components/HomeCompoents/EditorsPick";
import FaqSection from "@/components/HomeCompoents/FaqSection";
import HasselFreeExperience from "@/components/HomeCompoents/HasselFreeExperience";
import { AnimatedTestimonialsDemo } from "@/components/HomeCompoents/Testimonials";
import HeroSection from "@/components/HomeCompoents/HeroSection";
import TopRatedMoviesPage from "@/components/HomeCompoents/Content/TopRatedMoviesPage";
import NewlyAddedMovies from "@/components/HomeCompoents/Content/NewlyAddedMovies";


const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <TopRatedMoviesPage />
      <HasselFreeExperience />
      <NewlyAddedMovies />
      <EditorsPick />
      <FaqSection />
      <AnimatedTestimonialsDemo />
    </div>
  );
};

export default HomePage;
