
import EditorsPick from './EditorsPick';
import { getEditorPick } from '@/service/EditorPick';

const EditorPickMovies = async () => {

    const result = await getEditorPick();

    return (
        <div>
            <EditorsPick data={result?.data?.data} />
        </div>
    );
};

export default EditorPickMovies;
