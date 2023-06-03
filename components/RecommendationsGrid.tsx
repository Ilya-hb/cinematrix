import { Recommendations } from "@/typings";
import React, { useState } from "react";
import Link from "next/link";

interface Props {
  recommendations: Recommendations[];
}

function RecommendationsGrid({ recommendations }: Props) {
  const [showAll, setShowAll] = useState(false);

  // Filter out movies without images
  const moviesWithImages = recommendations.filter((movie) => movie.poster_path);

  // Limit the number of displayed items
  const limitedMovies = showAll
    ? moviesWithImages
    : moviesWithImages.slice(0, 12);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5 mb-5">
        {limitedMovies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            passHref
            key={movie.id}
            className="rounded-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-90% object-cover rounded-lg hover:scale-105 transition"
            />
            <p className="text-lg my-2 font-semibold">{movie.title}</p>
          </Link>
        ))}
      </div>
      {moviesWithImages.length > 12 && (
        <button
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 py-3 mx-auto transition-colors duration-300 ease-in-out block"
          onClick={toggleShowAll}
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default RecommendationsGrid;
