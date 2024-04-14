import { createEffect } from "effector";
import { AxiosRequestConfig } from "axios";
import { apiInstance } from "src/shared/api/base";
import { PosterResponse } from "../models/IPosterList";

export const getMoviePostersFx = createEffect<
  { movieId: number[]; page: number; limit: number },
  PosterResponse
>(async ({ movieId, page = 1, limit = 10 }) => {
  const selectFields = ["previewUrl"];
  const config: AxiosRequestConfig = {
    params: {
      page,
      limit,
      selectFields: selectFields.join(","),
      movieId: movieId.join(","),
    },
    paramsSerializer: (params) => {
      return Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join("&");
    },
  };

  try {
    const response = await apiInstance.get<PosterResponse>(
      "/v1.4/image",
      config,
    );
    return response;
  } catch (error) {
    console.error("Error during fetching movie posters:", error);
    throw error;
  }
});

getMoviePostersFx.fail.watch(({ error }) => {
  console.error("Failed to fetch movie posters", error);
});
