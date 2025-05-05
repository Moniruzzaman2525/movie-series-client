import Details from "@/common/details/Details";
import { getContentById } from "@/service/content";



const page = async ({ params }: { params: Promise<{ id: string }> }) => {
     const seriesId = (await params).id
     const singleSeries = await getContentById(seriesId)
     return (
          <div>
               <Details movieData={singleSeries?.data} ></Details>
          </div>
     );
};

export default page;