export interface Country {
  name: string;
}

export interface Movie {
  id: number;
  name: string | null;
  description: string | null;
  year: number | null;
  ageRating: number | null;
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  countries: Country[];
  rating: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
}

export interface MovieCardProps {
  movie: Movie;
}
