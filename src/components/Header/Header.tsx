import { Heading, Box, Flex, IconButton, useDisclosure, Collapse } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import DesktopHeaderNav from "./DesktopHeaderNav";
import MobileHeaderNav from "./MobileHeaderNav";
import NextLink from "next/link";
import UserEditModal from "../UserEditModal";
import AddressEditModal from "../AddressEditModal";

const Header = () => {
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isProfileEditOpen,
    onOpen: onProfileEditOpen,
    onClose: onProfileEditClose,
  } = useDisclosure();
  const {
    isOpen: isAddressEditOpen,
    onOpen: onAddressEditOpen,
    onClose: onAddressEditClose,
  } = useDisclosure();

  return (
    <Box
      as="header"
      borderBottom={"2px solid #DEE2E6"}
      boxShadow={isOpen ? "lg" : "none"}
      bgColor={"#FDFDFD"}
      position={"absolute"}
      top={0}
      right={0}
      left={0}
      minW={"100%"}
      zIndex={"dropdown"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        p={{
          base: "0px 16px 0px 16px",
          md: "0px 60px 0px 60px",
          xl: "0px 105px 0px 60px",
        }}
        height={"80px"}
      >
        <Flex justify={"start"}>
          <Heading
            as={NextLink}
            href={"/"}
            fontSize={"heading.4 "}
            bgGradient={"linear(to-r, #0B0D0D, #4529E6)"}
            bgClip="text"
          >
            Motors{" "}
            <Heading fontSize={"heading.6"} as="span" color={"#4529E6"}>
              shop
            </Heading>
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
          borderLeft={"2px solid"}
          borderColor={"grey.6"}
          height={"100%"}
          paddingLeft={"36px"}
        >
          <DesktopHeaderNav
            onProfileEditOpen={onProfileEditOpen}
            onAddressEditOpen={onAddressEditOpen}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen}>
        <MobileHeaderNav
          onProfileEditOpen={onProfileEditOpen}
          onAddressEditOpen={onAddressEditOpen}
        />
      </Collapse>

      <UserEditModal isOpen={isProfileEditOpen} onClose={onProfileEditClose} />

      <AddressEditModal isOpen={isAddressEditOpen} onClose={onAddressEditClose} />
    </Box>
  );
};

export default Header;
