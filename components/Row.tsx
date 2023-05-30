import { Movie } from "@/typings";
import React, { useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMove, setMove] = useState(false);

  const handleClick = (direction: string) => {
    setMove(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="text-white text-2xl h-40 md:h-60 space-y-5 md:space-y-3 sm:mx-2 md:mx-20 drop-shadow-lg shadow-black mb-5">
      <h2 className="w-56 cursor-pointer text-xl font-semibold transition duration-200 md:text-2xl text-[#e5e5e5] hover:text-white">
        {title}
      </h2>
      <div className="group relative md:-ml-2 ">
        <BsChevronLeft
          onClick={() => handleClick("left")}
          className={`absolute z-10 top-0 bottom-0 left-2 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100 ${
            !isMove && "hidden"
          }`}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <BsChevronRight
          onClick={() => handleClick("right")}
          className="absolute top-0 bottom-0 right-2 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default Row;
