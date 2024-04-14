import {
  Card,
  Heading,
  HStack,
  Image,
  VStack,
  Text,
  Collapse,
  Button,
  Box,
  Center,
  Flex,
  Tag,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { MovieCardProps } from "src/entities/models/Movie";
import { CircleRating } from "src/shared/ui";
import { NavLink } from "react-router-dom";
import { PATHS } from "src/app/router/paths";

const MovieCard = ({ movie }: MovieCardProps) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);
  return (
    <LinkBox w="100%">
      <Card w="100%" p="2" borderRadius="25">
        <Flex direction={{ base: "column", md: "row" }} align="center">
          <Box flexShrink={0}>
            {movie.poster.previewUrl ? (
              <Image
                h="350"
                src={movie.poster.previewUrl}
                alt={`Постер ${movie.name}`}
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
              <LinkOverlay as={NavLink} to={PATHS.FILM + "/" + movie.id}>
                <HStack>
                  <Heading size="md">{movie.name}</Heading>
                  <Tag>+{movie.ageRating}</Tag>
                </HStack>
              </LinkOverlay>

              <Flex wrap="wrap" justifyContent="space-evenly">
                <CircleRating rating={movie.rating.kp}>Кинопоиск</CircleRating>
                <CircleRating rating={movie.rating.imdb}>IMDB</CircleRating>
                <CircleRating rating={movie.rating.filmCritics}>
                  Кинокритики
                </CircleRating>
                <CircleRating rating={movie.rating.filmCritics}>
                  Рус. критики
                </CircleRating>
              </Flex>
              <Divider />
              <HStack>
                <Tag>Год выхода:</Tag>
                <Text>{movie.year || "-"}</Text>
              </HStack>
              <Divider />
              <HStack>
                <Tag>Страна:</Tag>
                <Text>
                  {movie.countries.map((country) => country.name).join(", ") ||
                    "-"}
                </Text>
              </HStack>
              <Divider />
              <>
                <Collapse startingHeight={40} in={show}>
                  <Tag>Описание:</Tag> {movie.description || "-"}
                </Collapse>
                {movie.description && (
                  <Button size="sm" onClick={handleToggle} mt="1rem">
                    Показать {show ? "меньше" : "больше"}
                  </Button>
                )}
              </>
            </VStack>
          </Box>
        </Flex>
      </Card>
    </LinkBox>
  );
};

export default MovieCard;
