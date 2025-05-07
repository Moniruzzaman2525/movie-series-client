


import { getAllContent } from '@/service/content';
import EditorsPick from './EditorsPick';

const EditorPickMovies = async () => {

    const result = await getAllContent("", "");

    return (
        <div>
            <EditorsPick data={result.data} />
        </div>
    );
};

export default EditorPickMovies;
