import { AxiosRequestConfig } from "axios";
import { createEffect } from "effector";
import { apiInstance } from "src/shared/api/base";
import { GetMoviesResponse } from "src/widgets/models/MovieModels";
import { SearchMoviesParams } from "../models/ISearch";

export const searchMoviesFx = createEffect<SearchMoviesParams, any>(
  async (params) => {
    const { page = 1, limit = 10, query } = params;
    const config: AxiosRequestConfig = {
      params: {
        page,
        limit,
        query,
      },
    };

    try {
      const response = await apiInstance.get<GetMoviesResponse>(
        `/v1.4/movie/search`,
        config,
      );
      return response;
    } catch (error) {
      console.error("Error during fetching movies:", error);
      throw error;
    }
  },
);

searchMoviesFx.fail.watch(({ error }) => {
  console.error("Failed to fetch movies with search:", error);
});
