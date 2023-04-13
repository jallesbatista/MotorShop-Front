import { Box, Flex, Heading, Icon, IconButton, Text } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

function Footer() {
  return (
    <Box
      as="footer"
      bg="black"
      color="white"
      py={{ base: "2", md: "4" }}
      px={{ base: "2", md: "6" }}
      mt={{ base: "2", md: "4" }}
      ml={{ base: "2", md: "4" }}
      mr={{ base: "2", md: "4" }}
    >
      <Flex
        px="25px"
        py="10px"
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        flexWrap="wrap"
        flexDirection={{ base: "column", md: "row" }}
        gap={{base: "20px"}}
      >
        <Heading as="h3" >Motors Shop</Heading>
        <Text fontSize={{ base: "sm", md: "md" }}>© 2022 - Todos os direitos reservados.</Text>
        <IconButton
          icon={<ChevronUpIcon />}
          aria-label="button-scrool-top"
          color="white"
          boxSize={{ base: "8", md: "6" }}
          px="5px"
          py="5px"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          bg="#212529"
          border="0px"
          _hover={{ backgroundColor: "#555" }}
        />
      </Flex>
    </Box>
  );
}

export default Footer;
