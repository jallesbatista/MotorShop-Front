import {
  Heading,
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Collapse,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import DesktopHeaderNav from "./DesktopHeaderNav";
import MobileHeaderNav from "./MobileHeaderNav";
import NextLink from "next/link";

const Header = () => {
  // OS ESTADOS SERÃO ATUALIZADOS PELO ESTADO DE "USER" NO CONTEXTO POSTERIORMENTE, ESTÃO DECLARADOS SOMENTE PARA TESTES NO MOMENTO.

  const [user, setUser] = useState({
    name: "Kenzinho Academilson",
    is_seller: true,
  });
  // const [user, setUser] = useState(null);

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      as="header"
      borderBottom={"2px solid #DEE2E6"}
      boxShadow={isOpen ? "lg" : "none"}
      bgColor={"#FDFDFD"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={{
          base: "0px 16px 0px 16px",
          md: "0px 20px 0px 20px",
        }}
        height={"80px"}
      >
        <Flex justify={"start"}>
          <Heading
            as={NextLink}
            href={"/"}
            fontSize={"32px"}
            bgGradient={"linear(to-r, #0B0D0D, #4529E6)"}
            bgClip="text"
          >
            Motors{" "}
            <Text as="span" color={"#4529E6"}>
              shop
            </Text>
          </Heading>
        </Flex>

        <Flex display={{ md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex
          display={{ base: "none", md: "flex" }}
          borderLeft={"2px solid #DEE2E6"}
          height={"100%"}
          paddingLeft={"36px"}
        >
          <DesktopHeaderNav user={user} />
        </Flex>
      </Flex>

      <Collapse in={isOpen}>
        <MobileHeaderNav user={user} />
      </Collapse>
    </Box>
  );
};

export default Header;
