import React from "react";
import { HStack, Button, Text } from "@chakra-ui/react";
import {
  ArrowLeftIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";

interface PaginationProps {
  page: number;
  maxPage: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, maxPage, setPage }) => {
  return (
    <HStack my="5" justifyContent="center">
      <Button onClick={() => setPage(1)} isDisabled={page <= 1}>
        <ArrowLeftIcon />
      </Button>
      <Button onClick={() => setPage(page - 1)} isDisabled={page <= 1}>
        <ArrowBackIcon />
      </Button>
      <Text>
        {page} из {maxPage}
      </Text>
      <Button onClick={() => setPage(page + 1)} isDisabled={maxPage <= page}>
        <ArrowForwardIcon />
      </Button>
      <Button onClick={() => setPage(maxPage)} isDisabled={maxPage <= page}>
        <ArrowRightIcon />
      </Button>
    </HStack>
  );
};

export default Pagination;
