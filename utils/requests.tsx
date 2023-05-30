import axios from "axios";
import { Movie } from "@/typings";

const API_KEY = process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchMovieDetails: async (id: string): Promise<Movie> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      return response.data;
    } catch (error) {
      // Handle error
      console.error("Error fetching movie details:", error);
      throw new Error("Failed to fetch movie details");
    }
  },
};

export default requests;
