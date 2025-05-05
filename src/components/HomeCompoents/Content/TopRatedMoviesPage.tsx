

import { getAllContent } from '@/service/Content';
import TopRatedMovies from './TopRatedMovies';

const TopRatedMoviesPage = async () => {

    const result = await getAllContent("", "");

    return (
        <div>
            <TopRatedMovies data={result.data} />
        </div>
    );
};

export default TopRatedMoviesPage;
