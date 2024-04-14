import { createEffect } from "effector";
import { apiInstance } from "src/shared/api/base";
import { DetailedMovie } from "src/entities/models/Movie";

export const getMovieDetailsFx = createEffect(async (movieId: number) => {
  const response = await apiInstance.get<DetailedMovie>(
    `/v1.4/movie/${movieId}`,
  );
  return response;
});

getMovieDetailsFx.fail.watch(({ error }) => {
  console.error("Failed to fetch movie details", error);
});
