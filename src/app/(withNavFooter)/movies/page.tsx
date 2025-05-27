import MovieSearch from "@/common/page/Movies";
import { getAllContent } from "@/service/Content";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MoviesPage = async ({ searchParams }: { searchParams: SearchParams }) => {

     const updatedQuery = await searchParams;
     const page = updatedQuery.page as string | undefined;
     const query = {
          ...updatedQuery,
          ctg: "movie",
     };
     const result = await getAllContent(page, "6", query);



     return (
          <div className="bg-black min-h-screen text-white">
               <div className="pt-20 container mx-auto">
                    <MovieSearch moviesData={result}></MovieSearch>
               </div>
          </div>
     );
};

export default MoviesPage;
