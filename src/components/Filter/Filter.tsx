import { mockedPosterList } from "@/mocks";
import TextFilter from "./TextFilter";
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import InputFilter from "./InputFilter";

const Filter = () => {
  const brandList = [...new Set(mockedPosterList.map((el) => el.brand))];
  const modelList = [...new Set(mockedPosterList.map((el) => el.model.split(" ")[0]))];
  const colorList = [...new Set(mockedPosterList.map((el) => el.color))];
  const yearList = [...new Set(mockedPosterList.map((el) => el.year))];
  const fuelList = [...new Set(mockedPosterList.map((el) => el.fuel_type))];

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction={"column"} w={"20%"} display={{ base: "none", lg: "flex" }}>
        <Flex direction={"column"} gap={"12px"}>
          <TextFilter filterList={brandList}>Brand</TextFilter>
          <TextFilter filterList={modelList}>Model</TextFilter>
          <TextFilter filterList={colorList}>Color</TextFilter>
          <TextFilter filterList={yearList}>Year</TextFilter>
          <TextFilter filterList={fuelList}>Fuel</TextFilter>
          <InputFilter>Km</InputFilter>
          <InputFilter>Preço</InputFilter>
        </Flex>

        <Button bottom={0} variant={"brand1"}>
          Limpar filtros
        </Button>
      </Flex>

      <Flex justify={"center"} align={"center"} w={"100%"} display={{ base: "flex", lg: "none" }}>
        <Button onClick={onOpen} w={"80%"} maxW={"450px"} size={"lg"} variant={"brand1"}>
          Filtros
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent
          alignSelf={"flex-end"}
          overflow={"scroll"}
          bg={"white"}
          color={"grey.1"}
          w={"100%"}
          p={"18px 16px 32px 16px"}
          position={"fixed"}
          zIndex="overlay"
          maxHeight={"80%"}
        >
          <Flex justifyContent={"space-between"} mb={"48px"}>
            <Heading fontSize={"heading.7"} fontWeight={"medium"}>
              Filtro
            </Heading>
            <ModalCloseButton />
          </Flex>
          <Flex direction={"column"}>
            <Flex direction={"column"} gap={"12px"}>
              <TextFilter filterList={brandList}>Brand</TextFilter>
              <TextFilter filterList={modelList}>Model</TextFilter>
              <TextFilter filterList={colorList}>Color</TextFilter>
              <TextFilter filterList={yearList}>Year</TextFilter>
              <TextFilter filterList={fuelList}>Fuel</TextFilter>
              <InputFilter>Km</InputFilter>
              <InputFilter>Preço</InputFilter>
            </Flex>

            <Button bottom={0} variant={"brand1"}>
              Limpar filtros
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filter;
