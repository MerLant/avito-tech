import { PATHS } from "src/app/router/paths";
import { Button, Center, Heading, Stack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Center minH="100%">
      <Stack spacing={4}>
        <Heading>Страница не найдена!</Heading>

        <Button as={NavLink} to={PATHS.HOME}>
          Вернуться на главную
        </Button>
      </Stack>
    </Center>
  );
};

export default NotFoundPage;
