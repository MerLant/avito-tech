import React, { useState } from "react";
import {
  Box,
  Image,
  Link,
  Text,
  VStack,
  SimpleGrid,
  Center,
  Heading,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MovieBase } from "../../models/Movie";
import { Pagination } from "src/entities/ui";
import { PATHS } from "src/app/router/paths";

interface SimilarMoviesProps {
  movies: MovieBase[];
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const maxPage = Math.ceil(movies.length / itemsPerPage);

  const currentMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Box>
      {movies.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          {currentMovies.map((movie) => (
            <Link as={NavLink} to={PATHS.FILM + "/" + movie.id} key={movie.id}>
              <VStack key={movie.id} spacing={3}>
                <Image
                  h="200"
                  borderRadius="10"
                  src={movie.poster.previewUrl || ""}
                  alt={movie.name || "Фильм"}
                />
                <Text>{movie.name}</Text>
              </VStack>
            </Link>
          ))}
        </SimpleGrid>
      ) : (
        <Heading>Похожие фильмы отсутствуют.</Heading>
      )}
      {maxPage > 1 && (
        <Center mt="8">
          <Pagination
            page={currentPage}
            maxPage={maxPage}
            setPage={setCurrentPage}
          />
        </Center>
      )}
    </Box>
  );
};

export default SimilarMovies;
