import { createStore } from "effector";
import { getMoviePostersFx } from "../api/poster";
import { PosterResponse } from "../models/IPosterList";

const initialPostersState: PosterResponse = {
  docs: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 1,
};

const $postersStore = createStore<PosterResponse>(initialPostersState)
  .on(getMoviePostersFx.doneData, (_, response) => {
    return response || initialPostersState;
  })
  .on(getMoviePostersFx.fail, (state, error) => {
    console.error("Failed to fetch movie posters:", error);
    return {
      ...state,
      docs: [],
    };
  });

export { $postersStore };
