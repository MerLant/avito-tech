import FilmCard from "src/entities/ui/MovieCard/MovieCard";
import { SimpleGrid } from "@chakra-ui/react";
import { MovieListProps } from "src/features/models/IMovieList";

const FilmList = ({ movieList }: MovieListProps) => {
  return (
    <SimpleGrid>
      {movieList.map((movie) => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
};

export default FilmList;
