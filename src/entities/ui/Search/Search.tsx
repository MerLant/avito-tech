import React, { useState, useEffect } from "react";
import { useDebounce } from "src/shared/hooks/useDebounce";
import { searchMoviesFx } from "src/entities/api/search";
import { useUnit } from "effector-react";
import { $searchStore } from "src/entities/store/search";
import {
  Menu,
  MenuList,
  MenuItem,
  Input,
  Box,
  MenuButton,
  IconButton,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { PATHS } from "src/app/router/paths";

const Search = () => {
  const [input, setInput] = useState("");
  const debouncedSearchTerm = useDebounce(input, 1000);
  const movies = useUnit($searchStore);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMoviesFx({ query: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <Box width="150px" h="40px">
      <Menu isOpen={input.length > 0}>
        <Input
          variant="filled"
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Поиск..."
          width="100%"
        />
        <MenuButton
          as={IconButton}
          aria-label="Options"
          variant="outline"
          width="100%"
          h="0"
          border="0"
          m="0"
          p="0"
        ></MenuButton>
        <MenuList w="100%" p="0">
          {movies.docs
            .filter((movie) => movie.name)
            .map((movie) => (
              <MenuItem
                w="100%"
                key={movie.id}
                as={NavLink}
                onClick={() => {
                  setInput("");
                  movies.docs = [];
                }}
                to={PATHS.FILM + "/" + movie.id}
              >
                {movie.name}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Search;
