export interface Country {
  name: string;
}

export interface Movie {
  id: number;
  name: string;
  year: number;
  ageRating: number;
  poster: {
    url: string;
    previewUrl: string;
  };
  countries: Country[];
  rating: {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number | null;
  };
}

export interface MovieCardProps {
  movie: Movie;
}
