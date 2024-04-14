export interface SeasonResponse {
  docs: Season[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface Season {
  number: number;
  episodes: Episode[];
  name: string | null;
  poster: Image | null;
  id: string;
}

export interface Episode {
  number: number;
  name: string | null;
  enName: string | null;
  still: Image;
  duration: number | null;
  date: string | null;
  description: string | null;
  airDate: string | null;
  enDescription: string | null;
}

export interface Image {
  url: string | null;
  previewUrl: string | null;
}

export interface FetchSeasonsParams {
  page?: number;
  limit?: number;
  movieId: number[];
  selectFields?: string[];
}
