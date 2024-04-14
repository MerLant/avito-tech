import { createEffect } from "effector";
import { AxiosRequestConfig } from "axios";
import { apiInstance } from "src/shared/api/base";
import { ReviewsResponse } from "../models/review";

export const getReviewsFx = createEffect<
  { page: number; limit: number; movieId: string[] },
  ReviewsResponse
>(async ({ page = 1, limit = 10, movieId }) => {
  const config: AxiosRequestConfig = {
    params: {
      page,
      limit,
      movieId: movieId.join(","),
    },
    paramsSerializer: (params) => {
      return Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params[key])}`)
        .join("&");
    },
  };

  try {
    const response = await apiInstance.get<ReviewsResponse>(
      "/v1.4/review",
      config,
    );
    return response;
  } catch (error) {
    console.error("Error during fetching reviews:", error);
    throw error;
  }
});

getReviewsFx.fail.watch(({ error }) => {
  console.error("Failed to fetch reviews", error);
});
