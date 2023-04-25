import { IHeaderNavProps } from "@/interfaces/test.interfaces";
import {
  Menu,
  MenuButton,
  Button,
  Avatar,
  MenuList,
  MenuItem,
  Stack,
  Box,
  Link,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

const DesktopHeaderNav = ({ user }: IHeaderNavProps) => {
  return (
    <>
      {user ? (
        <Menu>
          <MenuButton
            px={"0px"}
            bgColor={"transparent"}
            as={Button}
            leftIcon={<Avatar name={user.name} width="40px" h="40px" />}
            alignSelf={"center"}
            _active={{}}
            _hover={{}}
          >
            <Text
              textAlign={"left"}
              minW={"100px"}
              maxW={"200px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              fontSize={"body.1"}
              color={"grey.2"}
            >
              {user.name}
            </Text>
          </MenuButton>
          <MenuList color={"grey.2"}>
            <MenuItem>Editar Perfil</MenuItem>
            <MenuItem>Editar Endereço</MenuItem>
            {user?.is_seller ? <MenuItem>Meus Anúncios</MenuItem> : null}
            <MenuItem>Sair</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"36px"}
        >
          <Box display="flex" alignItems={"center"} textAlign={"center"}>
            <Link _hover={{}} color={"grey.2"} as={NextLink} href="/login" fontWeight={"semibold"}>
              Fazer Login
            </Link>
          </Box>
          <Box>
            <Button
              p={"20px"}
              px={["24px", "24px"]}
              variant={"outline2"}
              size={"lg"}
              border={"2px solid #CED4DA"}
              rounded={"4px"}
              as={NextLink}
              href="/register"
            >
              Cadastrar
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default DesktopHeaderNav;
