import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { Movie } from "@/typings";
import Input from "@/components/Input";
import Link from "next/link";
import { AiOutlineLoading } from "react-icons/ai";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results);
      setIsLoading(false); // Stop loading
    } catch (error) {
      console.error("Failed to search movies:", error);
      setSearchResults([]);
      setIsLoading(false); // Stop loading
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div>
      <Navbar />
      <div className="w-full h-full bg-[url('/images/background_3.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">Movie Search</h2>
          <div className="flex">
            <Input
              label=""
              type="search"
              id="search"
              onChange={(e: any) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyPress={handleKeyPress}
              sx="rounded-none w-full text-xl"
            />
            <button
              onClick={handleSearch}
              className="bg-red-600 text-white text-xl px-4 py-2 hover:bg-red-700 transition rounded-none"

            >
              Search
            </button>
          </div>
          {isLoading ? (
            <>
              <h1 className="text-3xl my-3">Loading... </h1>
              <AiOutlineLoading className="text-4xl animate-spin inline-block" />
            </>
          ) : searchResults.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center mt-16 ">
              {searchResults
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                  <li key={movie.id} className="mb-2">
                    <Link
                      href={`/movie/${movie.id}`}
                      passHref
                      key={movie.id}
                      className="rounded-lg"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-80% object-cover rounded-lg hover:scale-105 transition"
                      />
                      <p className="text-xl my-3 font-semibold">
                        {movie.title}
                      </p>
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="mt-4">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
