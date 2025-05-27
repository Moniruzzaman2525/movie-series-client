import SeriesSearch from "@/common/page/series";
import { getAllContent } from "@/service/Content";



type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const SeriesPage = async ({ searchParams }: { searchParams: SearchParams }) => {

     const updatedQuery = await searchParams;
     const page = updatedQuery.page as string | undefined;
     const query = {
          ...updatedQuery,
          ctg: "series",
     };
     const result = await getAllContent(page, "6", query);

     return (
          <div className="bg-black min-h-screen text-white  ">
               <div className="pt-20 container mx-auto">
                    <SeriesSearch moviesData={result}></SeriesSearch>
               </div>
          </div>
     );
};

export default SeriesPage;
