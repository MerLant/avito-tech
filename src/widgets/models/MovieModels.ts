import { Movie } from "src/entities/models/IMovieCard";

export interface GetMoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
