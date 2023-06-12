import Navbar from "@/components/Navbar";
import { Movie } from "@/typings";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function Favorites() {
  const [data, setData] = useState<string[] | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/favorite");
        if (response.ok) {
          const favorites = await response.json();
          console.log("Favorites:", favorites);
          setData(favorites.favoritedMovies || []);
          console.log("Data:", data);
        } else {
          console.error("Failed to fetch favorites:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      if (Array.isArray(data) && data.length > 0) {
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
      } else {
        console.log("No data or data length is 0");
      }
    };

    fetchMovies();
  }, [data]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold my-4">Your list</h1>
        {loading ? (
          <h2 className="text-4xl">
            Loading...{" "}
            <AiOutlineLoading className="text-4xl animate-spin inline-block" />
          </h2>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
            {movies.length > 0 ? (
              movies.map((movie) => (
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
                  <p className="text-xl my-3 font-semibold">{movie.title}</p>
                </Link>
              ))
            ) : (
              <h2 className="text-4xl">No favorite movies found {":("}</h2>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
