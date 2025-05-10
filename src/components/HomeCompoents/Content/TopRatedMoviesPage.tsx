


import { getTopRatedThisWeek } from '@/service/content';
import TopRatedMovies from './TopRatedMovies';

const TopRatedMoviesPage = async () => {

    const result = await getTopRatedThisWeek();


    return (
        <div>
            <TopRatedMovies data={result?.data} />
        </div>
    );
};

export default TopRatedMoviesPage;
