import axios from "axios";
import {
  Movie,
  MovieCredits,
  Person,
  PersonImages,
  Recommendations,
} from "@/typings";

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
  fetchMovieCredits: async (id: string): Promise<MovieCredits[]> => {
    try {
      const response = await axios.get<{ cast: MovieCredits[] }>(
        `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
      );
      console.log(response.data);
      return response.data.cast;
    } catch (error) {
      console.error("Error fetching movie cast: ", error);
      throw new Error("Failed to fetch movie credits");
    }
  },

  fetchRecommendations: async (id: string): Promise<Recommendations[]> => {
    try {
      const response = await axios.get<{ results: Recommendations[] }>(
        `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`
      );
      console.log(response.data);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching movie recommendations: ", error);
      throw new Error("Failed to fetch recommendations");
    }
  },
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
  fetchTrendingPeople: async (): Promise<Person[]> => {
    try {
      const response = await axios.get<{ results: Person[] }>(
        `${BASE_URL}/trending/person/day?api_key=${API_KEY}&language=en-US&page=1`
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching trending people: ", error);
      throw new Error("Failed to fetch trending people");
    }
  },
  fetchPersonDetails: async (id: string): Promise<Person> => {
    try {
      const response = await axios.get<Person>(
        `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching person details: ", error);
      throw new Error("Failed to fetch person details");
    }
  },
};

export default requests;
