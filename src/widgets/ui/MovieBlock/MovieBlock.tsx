import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MovieList } from "src/features/ui";
import { MovieFilter, Pagination } from "src/entities/ui";
import { getMoviesFx } from "src/widgets/api/movie";
import { FilterParams } from "src/entities/models/IMovieFilter";
import { $moviesStore } from "src/widgets/store/movie";

const MovieBlock = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movies = useUnit($moviesStore);

  const [page, setPage] = useState(
    parseInt(new URLSearchParams(location.search).get("page") || "1", 10),
  );
  const [limit, setLimit] = useState(
    parseInt(new URLSearchParams(location.search).get("limit") || "10", 10),
  );
  const [filters, setFilters] = useState<FilterParams>({
    yearRange: [
      parseInt(
        new URLSearchParams(location.search).get("yearFrom") || "1990",
        10,
      ),
      parseInt(
        new URLSearchParams(location.search).get("yearTo") ||
          `${new Date().getFullYear()}`,
        10,
      ),
    ],
    ageRange: [
      parseInt(new URLSearchParams(location.search).get("ageFrom") || "0", 10),
      parseInt(new URLSearchParams(location.search).get("ageTo") || "18", 10),
    ],
    ratingRange: [
      parseInt(
        new URLSearchParams(location.search).get("ratingFrom") || "0",
        10,
      ),
      parseInt(
        new URLSearchParams(location.search).get("ratingTo") || "10",
        10,
      ),
    ],
    country: new URLSearchParams(location.search).get("country") || "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    params.set("yearFrom", filters.yearRange[0].toString());
    params.set("yearTo", filters.yearRange[1].toString());
    params.set("ageFrom", filters.ageRange[0].toString());
    params.set("ageTo", filters.ageRange[1].toString());
    params.set("ratingFrom", filters.ratingRange[0].toString());
    params.set("ratingTo", filters.ratingRange[1].toString());
    if (filters.country) {
      params.set("country", filters.country);
    }

    navigate(`?${params.toString()}`, { replace: true });

    getMoviesFx({
      page,
      limit,
      year: [`${filters.yearRange[0]}-${filters.yearRange[1]}`],
      ageRating: [`${filters.ageRange[0]}-${filters.ageRange[1]}`],
      ratingKp: [`${filters.ratingRange[0]}-${filters.ratingRange[1]}`],
      countriesName: [`${filters.country}`],
    });
  }, [filters, page, limit, navigate]);

  const handleApplyFilters = (newFilters: FilterParams) => {
    console.log(newFilters);
    setFilters(newFilters);
  };

  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading mb="4">Фильмы и сериалы</Heading>
        <MovieFilter
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
        />
      </HStack>
      <Pagination page={page} maxPage={movies.pages} setPage={setPage} />

      <MovieList movieList={movies.docs} />
      <Pagination page={page} maxPage={movies.pages} setPage={setPage} />
      <FormControl mt="5">
        <FormLabel>Количество на странице</FormLabel>
        <Select
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </FormControl>
    </Box>
  );
};

export default MovieBlock;
