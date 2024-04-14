import React, { useState } from "react";
import {
  Box,
  Avatar,
  Text,
  VStack,
  SimpleGrid,
  Center,
  Card,
  useBreakpointValue,
} from "@chakra-ui/react";
import { PersonListProps } from "../../models/IPersona";
import { Pagination } from "src/entities/ui";

const PersonList: React.FC<PersonListProps> = ({ persons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const maxPage = Math.ceil(persons.length / itemsPerPage);

  const currentPersons = persons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columns = useBreakpointValue({ base: 1, md: 5 });

  return (
    <Box>
      <SimpleGrid columns={columns} spacing={5}>
        {currentPersons.map((person) => (
          <Card h="200" key={person.id}>
            <VStack
              justifyContent="space-between"
              key={person.id}
              p={4}
              borderRadius="lg"
              h="100%"
            >
              <Avatar
                src={person.photo || ""}
                size="lg"
                name={person.name || "Имя отсутствует"}
              />
              <Text fontWeight="bold">{person.name || "Имя отсутствует"}</Text>
              <Text fontSize="sm">
                {person.profession || "Профессия отсутствует"}
              </Text>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
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

export default PersonList;
