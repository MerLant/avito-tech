import React, { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { $seasonsStore } from "../../store/seasons";
import { getSeasonsFx } from "../../api/seasons";
import { Box, Select, Image, Text, VStack, Heading } from "@chakra-ui/react";

interface MovieSeasonProps {
  movieId: number;
}

const MovieSeason = ({ movieId }: MovieSeasonProps) => {
  const seasons = useUnit($seasonsStore);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState("");

  useEffect(() => {
    getSeasonsFx({ movieId: [movieId] });
  }, [movieId]);

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(event.target.value);
    setSelectedEpisode("");
  };

  const handleEpisodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEpisode(event.target.value);
  };

  const selectedSeasonData = seasons.docs.find(
    (season) => season.id === selectedSeason,
  );
  const selectedEpisodeData = selectedSeasonData?.episodes.find(
    (episode) => episode.number.toString() === selectedEpisode,
  );

  if (seasons.total === 0) {
    return null;
  }

  return (
    <Box p={5}>
      <VStack spacing={4} align="stretch">
        <Select
          placeholder="Выберите сезон"
          onChange={handleSeasonChange}
          value={selectedSeason}
        >
          {seasons.docs.map((season) => (
            <option key={season.id} value={season.id}>
              {season.name}
            </option>
          ))}
        </Select>
        {selectedSeason && (
          <Select
            placeholder="Выберите эпизод"
            onChange={handleEpisodeChange}
            value={selectedEpisode}
          >
            {selectedSeasonData?.episodes.map((episode) => (
              <option key={episode.number} value={episode.number}>
                {episode.name || `Эпизод ${episode.number}`}
              </option>
            ))}
          </Select>
        )}
        {selectedEpisode && (
          <Box>
            <Heading size="md">
              {selectedEpisodeData?.name || "Нет названиея"}
            </Heading>
            {selectedEpisodeData?.still.url ? (
              <Image
                borderRadius="10"
                src={selectedEpisodeData.still.url}
                alt={selectedEpisodeData.name || "Нет постера"}
              />
            ) : (
              <Text>Нет постера </Text>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MovieSeason;
