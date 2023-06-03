import Navbar from "@/components/Navbar";
import { Movie } from "@/typings";
import { useEffect, useState } from "react";

function Favorites() {
  const [data, setData] = useState<string[] | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorite");
        if (response.ok) {
          const favorites = await response.json();
          setData(favorites);
          console.log(favorites);
        } else {
          console.error("Failed to fetch favorites:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (data && data.length > 0) {
        const moviePromises = data.map(async (movieId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY}`
          );
          if (response.ok) {
            const movie = await response.json();
            return movie;
          } else {
            console.error(
              `Failed to fetch movie details for ID ${movieId}:`,
              response.statusText
            );
            return null;
          }
        });

        const movieResults = await Promise.all(moviePromises);
        const filteredMovies = movieResults.filter((movie) => movie !== null);
        setMovies(filteredMovies);
      }
    };

    fetchMovies();
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-3xl font-bold">Favorites</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="bg-white p-4 rounded shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-56 object-cover rounded"
                />
                <h2 className="text-lg font-bold mt-2">{movie.title}</h2>
                <p className="text-sm">{movie.release_date}</p>
                <p className="text-gray-600">{movie.overview}</p>
              </div>
            ))
          ) : (
            <p>No favorite movies found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorites;
