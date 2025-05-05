

import { getAllContent } from '@/service/Content';
import NewlyAdded from '../NewlyAdded';

const EditorPickMovies = async () => {

    const result = await getAllContent("", "");

    return (
        <div>
            <NewlyAdded data={result.data} />
        </div>
    );
};

export default EditorPickMovies;
