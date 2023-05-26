import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
interface Props {
  popularMovies: Movie[];
}

const Billboard = ({ popularMovies }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(popularMovies[Math.floor(Math.random() * popularMovies.length)]);
  }, [popularMovies]);

  //   console.log(movie);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-10 space-x-20 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-full w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill
          style={{ objectFit: "cover" }}
          alt={"Billboard image"}
        />
      </div>
      <h1 className="text-white md:text-4xl lg:text-7xl font-bold drop-shadow-lg shadow-black">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="text-white max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl drop-shadow-lg shadow-black">
        {movie?.overview}
      </p>
      <div className="flex space-x-10 mx-7">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70 text-white">
          More info
          <BiInfoCircle className="h-5 w-5 text-white md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Billboard;
