import React, { useState } from "react";
import { MovieCredits } from "@/typings";
import Link from "next/link";

interface Props {
  movieCredits: MovieCredits[];
}

function MovieCast({ movieCredits }: Props) {
  const [showMore, setShowMore] = useState(false);

  const actorsWithImages = movieCredits.filter(
    (credit) => credit.profile_path !== null
  );

  const visibleActors = showMore
    ? actorsWithImages
    : actorsWithImages.slice(0, 12);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Movie Cast</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {visibleActors.map((credit) => (
          <Link
            key={credit.id}
            href={`/people/${credit.id}`}
            passHref
            className="text-center hover:scale-105 transition flex flex-col items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
              alt={credit.name}
              className="w-32 h-32 rounded-full object-cover"
            />
            <p className="text-center mt-4">{credit.name}</p>
          </Link>
        ))}
      </div>
      {actorsWithImages.length > 12 && (
        <button
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 py-3 mx-auto transition-colors duration-300 ease-in-out block"
          onClick={handleShowMore}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default MovieCast;
