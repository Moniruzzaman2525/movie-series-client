

import { getNewlyAdded } from '@/service/Content';
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
