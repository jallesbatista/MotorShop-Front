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
import { IPosterFilters, Iquery } from "@/interfaces/poster.interfaces";
import { useRouter } from "next/router";
import { useState } from "react";

interface IFilterProps {
  filters: IPosterFilters;
  query?: Iquery;
}

const Filter = ({ filters, query }: IFilterProps) => {
  const [priceMIN, setPriceMIN] = useState<string>(query?.priceMIN || "");
  const [priceMAX, setPriceMAX] = useState<string>(query?.priceMAX || "");
  const [kmMIN, setKmMIN] = useState<string>(query?.kmMIN || "");
  const [kmMAX, setKmMAX] = useState<string>(query?.kmMAX || "");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const cleanFilters = () => {
    setPriceMIN("");
    setPriceMAX("");
    setKmMIN("");
    setKmMAX("");
    router.push("/", "", {
      scroll: false,
    });
  };

  return (
    <>
      <Flex direction={"column"} w={"20%"} display={{ base: "none", lg: "flex" }}>
        <Flex direction={"column"} gap={"12px"}>
          <TextFilter filterName="brand" filterList={filters?.brands} query={query}>
            Marca
          </TextFilter>
          <TextFilter
            filterName="model"
            filterList={[...new Set(filters?.models?.map((model) => model.split(" ")[0]))]}
            query={query}
          >
            Modelo
          </TextFilter>
          <TextFilter filterName="color" filterList={filters?.colors} query={query}>
            Cor
          </TextFilter>
          <TextFilter filterName="year" filterList={filters?.years} query={query}>
            Ano
          </TextFilter>
          <TextFilter filterName="fuel" filterList={filters?.fuel_types} query={query}>
            Combustível
          </TextFilter>
          <InputFilter
            filterName="km"
            query={query}
            kmMAX={kmMAX}
            kmMIN={kmMIN}
            priceMAX={priceMAX}
            priceMIN={priceMIN}
            setKmMAX={setKmMAX}
            setKmMIN={setKmMIN}
            setPriceMAX={setPriceMAX}
            setPriceMIN={setPriceMIN}
          >
            Km
          </InputFilter>
          <InputFilter
            filterName="price"
            query={query}
            kmMAX={kmMAX}
            kmMIN={kmMIN}
            priceMAX={priceMAX}
            priceMIN={priceMIN}
            setKmMAX={setKmMAX}
            setKmMIN={setKmMIN}
            setPriceMAX={setPriceMAX}
            setPriceMIN={setPriceMIN}
          >
            Preço
          </InputFilter>
        </Flex>

        <Button bottom={0} onClick={cleanFilters} variant={"brand1"}>
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
              <TextFilter filterName="brand" filterList={filters?.brands} query={query}>
                Marca
              </TextFilter>
              <TextFilter
                filterName="model"
                filterList={[...new Set(filters?.models?.map((model) => model.split(" ")[0]))]}
                query={query}
              >
                Modelo
              </TextFilter>
              <TextFilter filterName="color" filterList={filters?.colors} query={query}>
                Cor
              </TextFilter>
              <TextFilter filterName="year" filterList={filters?.years} query={query}>
                Ano
              </TextFilter>
              <TextFilter filterName="fuel" filterList={filters?.fuel_types} query={query}>
                Combustível
              </TextFilter>
              <InputFilter
                filterName="km"
                query={query}
                kmMAX={kmMAX}
                kmMIN={kmMIN}
                priceMAX={priceMAX}
                priceMIN={priceMIN}
                setKmMAX={setKmMAX}
                setKmMIN={setKmMIN}
                setPriceMAX={setPriceMAX}
                setPriceMIN={setPriceMIN}
              >
                Km
              </InputFilter>
              <InputFilter
                filterName="price"
                query={query}
                kmMAX={kmMAX}
                kmMIN={kmMIN}
                priceMAX={priceMAX}
                priceMIN={priceMIN}
                setKmMAX={setKmMAX}
                setKmMIN={setKmMIN}
                setPriceMAX={setPriceMAX}
                setPriceMIN={setPriceMIN}
              >
                Preço
              </InputFilter>
            </Flex>

            <Button
              onClick={() => {
                onClose();
                cleanFilters();
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
