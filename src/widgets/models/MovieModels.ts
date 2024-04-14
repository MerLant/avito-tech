import { Movie } from "src/entities/models/Movie";

export interface GetMoviesResponse {
  docs: Movie[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
