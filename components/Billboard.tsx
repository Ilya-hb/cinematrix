import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Props {
  popular: Movie[];
}

const Billboard = ({ popular }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(popular[Math.floor(Math.random() * popular.length)]);
  }, [popular]);

  return (
    <div className="flex flex-col space-y-5 py-32 md:space-y-10 md:space-x-20 lg:h-[65vh] lg:pb-12">
      <div className="absolute top-0 left-0 z-0 h-full w-full opacity-60 sm:opacity-80">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill
          style={{ objectFit: "cover" }}
          alt={"Billboard image"}
        />
      </div>
      <h1 className="text-white text-xl md:text-4xl lg:text-7xl font-bold drop-shadow-lg shadow-black mx-auto">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="text-white max-w-xs text-xl md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl drop-shadow-lg shadow-black mx-auto sm:block my-auto">
        {movie?.overview}
      </p>
      <Link href={`/movie/${movie?.id}`} passHref className="z-30 mx-auto sm:block my-auto">
        <button className="bg-red-600 text-white text-2xl px-4 py-2 hover:bg-red-700 transition rounded-none w-auto">
          More info
        </button>
      </Link>
    </div>
  );
};

export default Billboard;
