import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { PATHS } from "src/app/router/paths";
import { Search } from "src/entities/ui";
import { ColorModeSwitcher } from "src/features/ui";

const Header = () => {
  const bgColor = useColorModeValue("gray.200", "gray.700");
  return (
    <header>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        marginY="8px"
        marginX="4%"
        borderRadius="lg"
        padding="4px"
        bg={bgColor}
      >
        <Box p="2" gap="2">
          <Button as={NavLink} to={PATHS.HOME} _hover={{}}>
            <Heading
              display={"inline"}
              size="md"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              К
            </Heading>
          </Button>
        </Box>

        <Spacer />
        <Search />

        <Spacer />
        <ButtonGroup gap="2">
          <ColorModeSwitcher />
        </ButtonGroup>
      </Flex>
    </header>
  );
};

export default Header;
