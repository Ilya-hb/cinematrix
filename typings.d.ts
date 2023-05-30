export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  title: string;
  backdrop_path: string;
  media_type?: string;
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  tagline?: string;
  runtime: number;
  budget?: number;
  production_companies: ProductionCompany[];
  genres: Genre[];
  production_countries: ProductionCountry[];
}
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}
export interface Genre {
  id: number;
  name: string;
}
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}
