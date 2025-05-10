


import { getNewlyAdded } from '@/service/content';
import NewlyAdded from './NewlyAdded';

const NewlyAddedMovies = async () => {

    const result = await getNewlyAdded();

    return (
        <div>
            <NewlyAdded data={result?.data} />
        </div>
    );
};

export default NewlyAddedMovies;
