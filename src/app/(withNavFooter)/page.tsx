
import FaqSection from "@/components/HomeCompoents/FaqSection";
import HasselFreeExperience from "@/components/HomeCompoents/HasselFreeExperience";
import { AnimatedTestimonialsDemo } from "@/components/HomeCompoents/Testimonials";
import HeroSection from "@/components/HomeCompoents/HeroSection";
import TopRatedMoviesPage from "@/components/HomeCompoents/Content/TopRatedMoviesPage";
import NewlyAddedMovies from "@/components/HomeCompoents/Content/NewlyAddedMovies";
import EditorPickMovies from "@/components/HomeCompoents/Content/EditorPickMovies";
import SubscriptionPage from "@/components/HomeCompoents/Subscription";
import { CategorySection } from "@/components/HomeCompoents/CategoryGrid";



const HomePage = async () => {



  return (
    <div>
      <HeroSection />
      <CategorySection  count={8} />
      <TopRatedMoviesPage />
      <HasselFreeExperience />
      <NewlyAddedMovies />
      <EditorPickMovies />
      <FaqSection />
      <AnimatedTestimonialsDemo />
      <SubscriptionPage></SubscriptionPage>
    </div>
  );
};

export default HomePage;
