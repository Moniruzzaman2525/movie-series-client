import MovieSearch from "@/common/page/Movies";


const MoviesPage = () => {
     return (
          <div className="bg-black min-h-screen text-white  ">
               <div className="pt-20 container mx-auto">
                    <MovieSearch></MovieSearch>
               </div>
          </div>
     );
};

export default MoviesPage;