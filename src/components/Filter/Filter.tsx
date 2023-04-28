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
import { IPosterFilters } from "@/interfaces/poster.interfaces";
import Link from "next/link";
import { useRouter } from "next/router";

interface IFilterProps {
  filters: IPosterFilters;
  query?: {
    brand?: string;
    model?: string;
    color?: string;
    year?: string;
    fuel?: string;
  };
}

const Filter = ({ filters, query }: IFilterProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <Flex direction={"column"} w={"20%"} display={{ base: "none", lg: "flex" }}>
        <Flex direction={"column"} gap={"12px"}>
          <TextFilter filterList={filters?.brands} query={query}>
            Brand
          </TextFilter>
          <TextFilter
            filterList={[...new Set(filters?.models.map((model) => model.split(" ")[0]))]}
            query={query}
          >
            Model
          </TextFilter>
          <TextFilter filterList={filters?.colors} query={query}>
            Color
          </TextFilter>
          <TextFilter filterList={filters?.years} query={query}>
            Year
          </TextFilter>
          <TextFilter filterList={filters?.fuel_types} query={query}>
            Fuel
          </TextFilter>
          <InputFilter>Km</InputFilter>
          <InputFilter>Preço</InputFilter>
        </Flex>

        <Button bottom={0} as={Link} href={"/"} variant={"brand1"}>
          Limpar filtros
        </Button>
      </Flex>

      <Flex justify={"center"} align={"center"} w={"100%"} display={{ base: "flex", lg: "none" }}>
        <Button onClick={onOpen} w={"80%"} maxW={"450px"} size={"lg"} variant={"brand1"}>
          Filtros
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick isCentered>
        <ModalOverlay />
        <ModalContent
          bg={"white"}
          color={"grey.1"}
          w={"100%"}
          p={"18px 16px 32px 16px"}
          maxH={"80%"}
          overflowY={"scroll"}
          sx={{
            "::-webkit-scrollbar": {
              width: "6px",
            },
            "::-webkit-scrollbar-track": {
              width: "6px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "brand.3",
              borderRadius: "24px",
            },
          }}
        >
          <Flex justifyContent={"space-between"} mb={"32px"} position={"relative"}>
            <Heading fontSize={"heading.7"} fontWeight={"medium"}>
              Filtro
            </Heading>
            <ModalCloseButton top={"-10px"} right={0} />
          </Flex>
          <Flex direction={"column"}>
            <Flex direction={"column"} gap={"12px"}>
              <TextFilter filterList={filters?.brands} query={query}>
                Brand
              </TextFilter>
              <TextFilter
                filterList={[...new Set(filters?.models.map((model) => model.split(" ")[0]))]}
                query={query}
              >
                Model
              </TextFilter>
              <TextFilter filterList={filters?.colors} query={query}>
                Color
              </TextFilter>
              <TextFilter filterList={filters?.years} query={query}>
                Year
              </TextFilter>
              <TextFilter filterList={filters?.fuel_types} query={query}>
                Fuel
              </TextFilter>
              <InputFilter>Km</InputFilter>
              <InputFilter>Preço</InputFilter>
            </Flex>

            <Button
              onClick={() => {
                onClose();
                router.push("/");
              }}
              bottom={0}
              variant={"brand1"}
            >
              Limpar filtros
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Filter;
