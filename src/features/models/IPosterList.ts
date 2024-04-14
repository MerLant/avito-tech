import { Poster } from "src/entities/models/poster";

export interface PosterResponse {
  docs: Poster[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface MoviePostersProps {
  movieId: number;
}
