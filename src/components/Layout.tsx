import React, { ReactNode } from "react";
import { Box, Container } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Box as="header" bg="blue.600" py={4} mb={6}>
        <Container maxW="container.xl">
          <Box as="h1" fontSize="2xl" fontWeight="bold" color="white">
            Pokemon Explorer
          </Box>
        </Container>
      </Box>
      <Container maxW="container.xl" pb={8}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
