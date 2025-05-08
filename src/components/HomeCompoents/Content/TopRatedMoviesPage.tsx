

import { getTopRatedThisWeek } from '@/service/Content';
import TopRatedMovies from './TopRatedMovies';

const TopRatedMoviesPage = async () => {

    const result = await getTopRatedThisWeek();
    console.log(result)

    return (
        <div>
            <TopRatedMovies data={result?.data} />
        </div>
    );
};

export default TopRatedMoviesPage;
