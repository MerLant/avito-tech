import { MovieCardProps } from "src/entities/models/IMovieCard";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div>
      <h1>{movie.name}</h1>
    </div>
  );
};

export default MovieCard;
