import { Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          className="rounded-sm object-cover md:rounded"
          fill={true}
          alt="image"
        />
        <div className="thumbnail-overlay">
          <p className="text-xl movie-name">
            {movie?.title || movie?.name || movie?.original_name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Thumbnail;
