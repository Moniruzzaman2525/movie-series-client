import { Dispatch, SetStateAction } from "react";

const genres = [
     "SCIENCE_FICTION",
     "Action",
     "Adventure",
     "Animation",
     "Bangla Dubbed",
     "Biography",
     "Bollywood",
     "Comedy",
     "Crime",
     "Documentary",
     "Drama",
     "Dual Audio",
     "Family",
     "Fantasy",
     "History",
];

interface GenresListProps {
     setCatgory: Dispatch<SetStateAction<string | undefined>>;
     selectedGenre: string | undefined;
}

export default function GenresList({ setCatgory, selectedGenre }: GenresListProps) {
     return (
          <div className="bg-zinc-900 text-white w-full max-w-xs p-4 rounded-md">
               <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-2">
                    <h2 className="text-lg font-semibold">Genres</h2>
               </div>
               <ul className="space-y-2">
                    {genres.map((genre, index) => (
                         <li
                              key={index}
                              onClick={() => setCatgory(genre)}
                              className={`flex items-center gap-2 text-sm cursor-pointer 
              ${selectedGenre === genre ? "text-red-500 font-semibold" : "hover:text-red-400"}`}
                         >
                              <span
                                   className={`w-2 h-2 rounded-full 
                ${selectedGenre === genre ? "bg-red-500" : "bg-zinc-500"}`}
                              ></span>
                              {genre}
                         </li>
                    ))}
               </ul>
          </div>
     );
}
