/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

const genres = [
  { name: "Action", count: 676 },
  { name: "Adventure", count: 280 },
  { name: "Animation", count: 77 },
  { name: "Bangla Dubbed", count: 1 },
  { name: "Biography", count: 44 },
  { name: "Bollywood", count: 230 },
  { name: "Comedy", count: 430 },
  { name: "Crime", count: 376 },
  { name: "Documentary", count: 23 },
  { name: "Drama", count: 940 },
];

const GenreList = ({ onGenreSelect}:{onGenreSelect?: (genre:string) => void}) => {
  const handleClick = (genre:string) => {
    if (onGenreSelect) {
      onGenreSelect(genre);
    }
  };

  return (
    <div className="bg-black text-white p-4 w-64 rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Genres</h2>
        <span className="text-gray-400 cursor-pointer">▼</span>
      </div>
      <ul className="space-y-3 text-sm text-gray-300">
        {genres.map((genre, index) => (
          <li
            key={index}
            onClick={() => handleClick(genre.name)}
            className="flex justify-between hover:text-white cursor-pointer transition"
          >
            <span>{genre.name}</span>
            <span>{genre.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;
