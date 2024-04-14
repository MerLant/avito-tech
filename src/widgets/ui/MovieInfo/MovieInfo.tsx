import { VStack } from "@chakra-ui/react";
import {
  MovieDetails,
  MovieReviews,
  MovieSeason,
  PosterList,
} from "src/features/ui";

interface MovieInfoProps {
  movieId: number;
}

const MovieInfo = ({ movieId }: MovieInfoProps) => {
  return (
    <>
      <VStack>
        <MovieDetails movieId={movieId} />
        <PosterList movieId={movieId} />
        <MovieSeason movieId={movieId} />
        <MovieReviews movieId={movieId} />
      </VStack>
    </>
  );
};

export default MovieInfo;
