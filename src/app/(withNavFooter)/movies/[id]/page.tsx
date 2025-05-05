import Details from "@/common/details/Details";
import { getContentById } from "@/service/content";



const page = async({params}:{params:Promise<{id:string}>}) => {
     const moviesId=  (await params).id
     const singleMovies = await getContentById(moviesId)

     console.log(singleMovies.data)



     return (
          <div>
               <Details movieData={singleMovies?.data} ></Details>
          </div>
     );
};

export default page;