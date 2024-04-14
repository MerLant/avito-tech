import { createStore } from "effector";
import { getMovieDetailsFx } from "../api/MovieDetails";
import { DetailedMovie } from "src/entities/models/Movie";

const initialMovieState: DetailedMovie = {
  id: 0,
  name: null,
  description: null,
  year: null,
  ageRating: null,
  poster: {
    url: null,
    previewUrl: null,
  },
  countries: [],
  rating: {
    kp: null,
    imdb: null,
    filmCritics: null,
    russianFilmCritics: null,
    await: null,
  },
  persons: [],
  similarMovies: [],
};

const $movieDetailsStore = createStore<DetailedMovie>(initialMovieState)
  .on(getMovieDetailsFx.doneData, (_, response) => {
    return response;
  })
  .on(getMovieDetailsFx.fail, (state, error) => {
    console.error("Failed to fetch movie details:", error);
    return initialMovieState;
  });

export { $movieDetailsStore };
