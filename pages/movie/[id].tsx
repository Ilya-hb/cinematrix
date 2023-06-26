import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";

import Navbar from "@/components/Navbar";
import { Movie, Element, Recommendations, MovieCredits } from "@/typings";
import requests from "@/utils/requests";
import React from "react";
import RecommendationsGrid from "@/components/RecommendationsGrid";
import MovieCast from "@/components/MovieCast";
import FavoritesButton from "@/components/FavoritesButton";

interface MovieProps {
  id: string;
  movie: Movie;
  recommendations: Recommendations[];
  movieCredits: MovieCredits[];
}

const MoviePage: NextPage<MovieProps> = ({
  id,
  movie,
  recommendations,
  movieCredits,
}) => {
  const [trailer, setTrailer] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "//yohoho.cc/yo.js";
  //   script.async = true;
  //   script.dataset.title = movie.title;
  //   document.getElementById("yohoho")?.appendChild(script);

  //   return () => {
  //     // Cleanup script when the component is unmounted
  //     script.remove();
  //   };
  // }, [movie.title]);

  useEffect(() => {
    async function fetchMovieTrailer() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${
            movie.media_type === "tv" ? "tv" : "movie"
          }/${movie.id}?api_key=${
            process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY
          }&language=en-US&append_to_response=videos`
        );
        const data = await response.json();

        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (element: Element) => element.type === "Trailer"
          );
          setTrailer(data.videos.results[index]?.key);
        }
      } catch (error) {
        console.error("Failed to fetch movie trailer:", error);
      }
    }

    fetchMovieTrailer();
  }, [movie]);

  const handleHomepageClick = () => {
    if (movie.homepage) {
      window.open(movie.homepage, "_blank");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            {/* Left Column - Movie Poster and Details */}
            <div className="mb-6">
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={450}
                className="rounded-lg"
              />
            </div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

              {movie.tagline && (
                <p className="text-white text-lg">Tagline: {movie.tagline}</p>
              )}
              <p className="text-white text-lg">
                Release Date: {movie.release_date}
              </p>
              <p className="text-white text-lg">
                Average Rating: {movie.vote_average}
              </p>
              <p className="text-white text-lg">
                Runtime: {movie.runtime} minutes
              </p>

              {movie.budget ? (
                <p className="text-white text-lg">
                  Budget: {movie.budget.toLocaleString()} $
                </p>
              ) : (
                ""
              )}
              {movie.homepage && (
                <a
                  className="text-white text-lg underline bg-transparent cursor-pointer border-none p-0"
                  onClick={handleHomepageClick}
                >
                  {movie.title} Homepage
                </a>
              )}
              <FavoritesButton movieId={id} />
            </div>
          </div>

          {/* Right Column - Movie Overview and Additional Information */}
          <div className="lg:w-2/3 lg:pl-8 mt-6 space-y-10">
            <h2 className="text-3xl font-bold mb-4">Overview</h2>
            <p className="mb-6 text-xl">{movie.overview}</p>
            {trailer && (
              <div className="mb-6">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  width="100%"
                  height="400px"
                  volume={0}
                  controls={true}
                  playing
                />
              </div>
            )}
            <br />
            {/* <div
              id="yohoho"
              className="w-full h-[400px]"
              data-title={movie.title}
              data-player='bazon'
            ></div> */}

            <h2 className="text-3xl font-bold mb-4">Additional Information</h2>
            <ul className="mb-6 space-y-2">
              <li>
                <strong className="text-xl">Genres:</strong>{" "}
                {movie.genres.map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    <span className="text-xl">{genre.name}</span>
                    {index !== movie.genres.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </li>
              <li>
                <strong className="text-xl">Production Companies:</strong>{" "}
                {movie.production_companies.map((company, index) => (
                  <React.Fragment key={company.id}>
                    <span className="text-xl">{company.name}</span>
                    {index !== movie.production_companies.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </li>
              <li>
                <strong className="text-xl">Production Countries:</strong>{" "}
                {movie.production_countries.map((country, index) => (
                  <React.Fragment key={index}>
                    <span className="text-xl">{country.name}</span>
                    {index !== movie.production_countries.length - 1 && ", "}
                  </React.Fragment>
                ))}
              </li>
            </ul>

            <div className="">
              <MovieCast movieCredits={movieCredits} />
            </div>

            <div className="">
              <h3 className="text-3xl font-semibold mb-5">More like this: </h3>
              <RecommendationsGrid recommendations={recommendations} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<MovieProps> = async (
  context
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const id = context.query.id;

  // Handle the case where the `id` parameter is an array
  const movieId = Array.isArray(id) ? id[0] : id || ""; // Provide a default value for id
  // Fetch movie details based on the `movieId` parameter
  const movie = await requests.fetchMovieDetails(movieId);
  const recommendations = await requests.fetchRecommendations(movieId);
  const movieCredits = await requests.fetchMovieCredits(movieId);
  return {
    props: {
      id: movieId,
      movie,
      recommendations,
      movieCredits,
    },
  };
};

export default MoviePage;