import { Box } from "@chakra-ui/react";
import { ILayout } from "src/shared/models/LayoutModels";

const Layout: React.FC<ILayout> = ({ children }) => {
  return <Box minH="100vh">{children}</Box>;
};

export default Layout;
