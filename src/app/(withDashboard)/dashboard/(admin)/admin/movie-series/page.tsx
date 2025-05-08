import { MoviesOrSeries } from "@/components/DashboardComponetns/UserDashboard/Admin/MoviesOrSeries";
import { getAllContent } from "@/service/Content";


const GetMovieOrSeries = async () => {
    const result = await getAllContent("", "");
    return (
        <div>
            <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
                <h1>Total: {result?.data?.length}</h1>
            </div>
            <MoviesOrSeries data={result} />
        </div>
    );
};

export default GetMovieOrSeries;
