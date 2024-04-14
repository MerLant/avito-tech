import { createStore } from "effector";
import { searchMoviesFx } from "src/entities/api/search";
import { GetMoviesResponse } from "src/widgets/models/MovieModels";

const initialMoviesState: GetMoviesResponse = {
  docs: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 0,
};

const $searchStore = createStore<GetMoviesResponse>(initialMoviesState)
  .on(searchMoviesFx.doneData, (_, response) => {
    return response || initialMoviesState;
  })
  .on(searchMoviesFx.fail, (state, error) => {
    console.error("Failed to fetch movies:", error);
    return initialMoviesState;
  });

export { $searchStore };
