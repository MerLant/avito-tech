import React, { useEffect, useState } from "react";
import { Box, Image, SimpleGrid, Text, Center } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { getMoviePostersFx } from "../../api/poster";
import { $postersStore } from "../../store/poster";
import { Pagination } from "src/entities/ui";
import { MoviePostersProps } from "src/features/models/IPosterList";

const PosterList: React.FC<MoviePostersProps> = ({ movieId }) => {
  const posters = useUnit($postersStore);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMoviePostersFx({ movieId: [movieId], page, limit: 3 });
  }, [movieId, page]);

  if (posters.docs.length === 0 && !posters.total) {
    return (
      <Center p="40px">
        <Text fontSize="xl" fontWeight="medium">
          Нет информации о постерах для этого фильма
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {posters.docs.map((poster) => (
          <Box key={poster.id} p="5" boxShadow="md" rounded="md">
            <Image src={poster.previewUrl} alt={`Постр для ${movieId}`} />
          </Box>
        ))}
      </SimpleGrid>
      {posters.pages > 1 && (
        <Pagination page={page} maxPage={posters.pages} setPage={setPage} />
      )}
    </Box>
  );
};

export default PosterList;
