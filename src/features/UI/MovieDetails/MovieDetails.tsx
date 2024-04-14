import {
  Card,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Box,
  Center,
  Flex,
  Tag,
  Divider,
} from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { MovieDetailsProps } from "../../models/IMovieDetails";
import { CircleRating } from "src/shared/ui";
import { useUnit } from "effector-react";
import { $movieDetailsStore } from "src/features/store/MovieDetails";
import { getMovieDetailsFx } from "src/features/api/MovieDetails";
import { PersonList, SimilarMovies } from "src/entities/ui";

const MovieDetails = ({ movieId }: MovieDetailsProps) => {
  const movieDetails = useUnit($movieDetailsStore);

  useEffect(() => {
    getMovieDetailsFx(movieId);
  }, [movieId]);

  return (
    <Card w="100%" p="5" borderRadius="25">
      <Flex wrap="wrap" mb="3">
        <Heading size="xl">{movieDetails.name}</Heading>
        <Tag>+{movieDetails.ageRating}</Tag>
      </Flex>
      <Flex direction={{ base: "column", md: "row" }} align="center" mb="3">
        <Box flexShrink={0}>
          {movieDetails.poster.previewUrl ? (
            <Image
              h="350"
              src={movieDetails.poster.previewUrl}
              alt={`Постер ${movieDetails.name}`}
              borderRadius="20"
            />
          ) : (
            <Card h="250px" w="100%" background="">
              <Center h="100%" w="100%">
                <VStack>
                  <ViewOffIcon />
                  <Text>Постер отсутствует</Text>
                </VStack>
              </Center>
            </Card>
          )}
        </Box>

        <Box flex="1" p="4">
          <VStack align="left" h="100%" justify="space-between">
            <Flex wrap="wrap" justifyContent="space-evenly">
              <CircleRating rating={movieDetails.rating.kp}>
                Кинопоиск
              </CircleRating>
              <CircleRating rating={movieDetails.rating.imdb}>
                IMDB
              </CircleRating>
              <CircleRating rating={movieDetails.rating.filmCritics}>
                Кинокритики
              </CircleRating>
              <CircleRating rating={movieDetails.rating.filmCritics}>
                Рус. критики
              </CircleRating>
            </Flex>
            <Divider />
            <HStack>
              <Tag>Год выхода:</Tag>
              <Text>{movieDetails.year || "Год выхода отсутствует"}</Text>
            </HStack>
            <Divider />
            <HStack>
              <Tag>Страна:</Tag>
              <Text>
                {movieDetails.countries
                  .map((country) => country.name)
                  .join(", ") || "Страны отсутствуют"}
              </Text>
            </HStack>
            <Divider />
            <Text>
              <Tag>Описание:</Tag>{" "}
              {movieDetails.description || "Описание отсутствует"}
            </Text>
          </VStack>
        </Box>
      </Flex>
      <PersonList persons={movieDetails.persons} />
      <SimilarMovies movies={movieDetails.similarMovies} />
    </Card>
  );
};

export default MovieDetails;
