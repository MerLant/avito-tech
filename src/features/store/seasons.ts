import { createStore } from "effector";
import { getSeasonsFx } from "../api/seasons";
import { SeasonResponse } from "../models/IMovieSeasons";

const initialSeasonsState: SeasonResponse = {
  docs: [],
  total: 0,
  limit: 10,
  page: 1,
  pages: 0,
};

const $seasonsStore = createStore<SeasonResponse>(initialSeasonsState)
  .on(getSeasonsFx.doneData, (_, response) => {
    return response || initialSeasonsState;
  })
  .on(getSeasonsFx.fail, (state, error) => {
    console.error("Failed to fetch seasons:", error);
    return state;
  });

export { $seasonsStore };
