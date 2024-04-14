import { createStore } from "effector";
import { getMoviesFx } from "src/widgets/api/movie";
import { GetMoviesResponse } from "src/widgets/models/MovieModels";

const initialMoviesState: GetMoviesResponse = {
  docs: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 0,
};

const $moviesStore = createStore(initialMoviesState)
  .on(getMoviesFx.doneData, (state, response) => {
    return response;
  })
  .on(getMoviesFx.fail, (state, error) => {
    console.error("Failed to fetch movies:", error);
    return {
      ...state,
      docs: [],
    };
  });

export { $moviesStore };
