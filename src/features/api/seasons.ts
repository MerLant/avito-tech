import { createEffect } from "effector";
import { AxiosRequestConfig } from "axios";
import { apiInstance } from "src/shared/api/base";
import { SeasonResponse, FetchSeasonsParams } from "../models/IMovieSeasons";

export const getSeasonsFx = createEffect<FetchSeasonsParams, SeasonResponse>(
  async (params) => {
    const {
      page = 1,
      limit = 10,
      movieId,
      selectFields = ["poster", "number", "name", "episodes"],
    } = params;

    const config: AxiosRequestConfig = {
      params: {
        page,
        limit,
        movieId: movieId.join(","),
      },
      paramsSerializer: (params) => {
        const selectParams = selectFields
          .map((field) => `selectFields=${encodeURIComponent(field)}`)
          .join("&");
        const otherParams = Object.keys(params)
          .filter((key) => key !== "selectFields")
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join("&");
        return `${selectParams}&${otherParams}`;
      },
    };

    try {
      const response = await apiInstance.get<SeasonResponse>(
        "/v1.4/season",
        config,
      );
      return response;
    } catch (error) {
      console.error("Error fetching seasons:", error);
      throw error;
    }
  },
);

getSeasonsFx.fail.watch(({ error }) => {
  console.error("Failed to fetch seasons", error);
});
