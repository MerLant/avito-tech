import { Person } from "src/entities/models/IPersona";

export interface Country {
  name: string;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface Movie extends MovieBase {
  ageRating: number | null;
  countries: Country[];
  description: string | null;
}

export interface MovieBase {
  id: number;
  name: string | null;
  year: number | null;
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  rating: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
}

export interface DetailedMovie extends MovieBase {
  persons: Person[];
  similarMovies: MovieBase[];
  ageRating: number | null;
  countries: Country[];
  description: string | null;
}
