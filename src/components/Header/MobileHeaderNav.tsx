import { IHeaderNavProps } from "@/interfaces/test.interfaces";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Stack,
  Flex,
  Avatar,
  Icon,
  Collapse,
  useColorModeValue,
  Button,
  Link,
  Box,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRef } from "react";

const MobileHeaderNav = ({ user }: IHeaderNavProps) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const ref: any = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  return (
    <Stack display={{ md: "none" }} p={"20px"} ref={ref}>
      {user ? (
        <>
          <Flex
            py={2}
            as={"button"}
            w={"100%"}
            justify={"space-between"}
            align={"center"}
            _hover={{
              textDecoration: "none",
            }}
            onClick={onToggle}
          >
            <Flex justify={"flex-start"} gap={"12px"} align={"center"}>
              <Avatar name={user.name} width="40px" h="40px" />
              <Text fontWeight={600} color={"black"} noOfLines={1}>
                {user.name}
              </Text>
            </Flex>
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          </Flex>
          <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
            <Stack
              mt={2}
              pl={4}
              borderLeft={1}
              borderStyle={"solid"}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              align={"start"}
            >
              <Button w={"100%"} variant={"outline1"}>
                Editar Perfil
              </Button>
              <Button w={"100%"} variant={"outline1"}>
                Editar Endereço
              </Button>
              {user?.is_seller ? (
                <Button w={"100%"} variant={"outlineBrand1"}>
                  Meus Anúncios
                </Button>
              ) : null}
              <Button variant={"alert"} w={"100%"}>
                Sair
              </Button>
            </Stack>
          </Collapse>
        </>
      ) : (
        <Stack spacing={4}>
          <Flex p={2} gap={"32px"} flexDirection={"column"}>
            <Box display="flex" alignItems={"center"} textAlign={"center"}>
              <Link as={NextLink} href="/" fontWeight={600}>
                Fazer Login
              </Link>
            </Box>
            <Box>
              <Button
                p={"20px"}
                w={"100%"}
                variant={"outline"}
                color="black"
                border={"2px solid #CED4DA"}
                as={NextLink}
                href="/"
              >
                Cadastrar
              </Button>
            </Box>
          </Flex>
        </Stack>
      )}
    </Stack>
  );
};

export default MobileHeaderNav;
