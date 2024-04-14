import FilmCard from "src/entities/ui/MovieCard/MovieCard";
import { VStack } from "@chakra-ui/react";
import { MovieListProps } from "src/features/models/IMovieList";

const FilmList = ({ movieList }: MovieListProps) => {
  return (
    <VStack gap="3">
      {movieList.map((movie) => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </VStack>
  );
};

export default FilmList;
