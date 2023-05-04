import { Button, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import PosterCard from "./PosterCard";
import { IPoster } from "@/interfaces/poster.interfaces";
import PosterCreateEditModal from "./PosterCreateEditModal";
import { useState } from "react";
import Link from "next/link";

interface IPosterList {
  posterList: any[];
  maxWidth: string;
  maxColumns: number;
  width: {
    lg: string;
    xl: string;
  };
  columns: {
    lg: number;
    xl: number;
  };
  edit?: boolean;
  showPromoTag: boolean;
  showStatusTag: boolean;
  showSeller: boolean;
  setPosters: React.Dispatch<React.SetStateAction<IPoster[]>>;
}

const PosterList = ({
  posterList,
  columns,
  width,
  maxWidth,
  edit,
  maxColumns,
  showPromoTag,
  showStatusTag,
  showSeller,
  setPosters,
}: IPosterList) => {
  if (!posterList) {
    return null;
  }

  const {
    isOpen: isEditModalOpen,
    onClose: onEditModalClose,
    onOpen: onEditModalOpen,
  } = useDisclosure();

  const [poster, setPoster] = useState<IPoster | null>(null);

  return (
    <>
      <Flex
        wrap={"nowrap"}
        display={{ base: "flex", lg: "none" }}
        overflowX={"scroll"}
        maxW={"100%"}
        gap={"16px"}
        px={"25px"}
        pb={"10px"}
        justify={posterList.length == 1 ? "center" : "normal"}
      >
        {posterList.map((poster, index) => (
          <Flex direction={"column"} key={index} gap={"12px"}>
            <PosterCard
              index={index}
              poster={poster}
              showPromoTag={showPromoTag}
              showStatusTag={showStatusTag}
              showSeller={showSeller}
            />
            {edit && (
              <Flex color={"grey.1"} gap={"16px"}>
                <Button
                  variant={"outline1"}
                  onClick={() => {
                    setPoster(poster);
                    onEditModalOpen();
                  }}
                >
                  Editar
                </Button>
                <Button as={Link} href={`/poster/${poster.id}`} variant={"outline1"}>
                  Ver detalhes
                </Button>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>

      <Grid
        gap={{ md: "100px 0px", lg: "100px 20px", xl: "100px 32px" }}
        templateColumns={{ lg: `repeat(${columns?.lg}, 1fr)`, xl: `repeat(${columns?.xl}, 1fr)` }}
        gridTemplateRows={"auto"}
        w={width}
        alignContent={"center"}
        maxW={maxWidth}
        display={{ base: "none", lg: "grid" }}
        h={"max-content"}
        justifyItems={"center"}
        sx={{
          "@media (min-width: 1320px)": {
            gridTemplateColumns: `repeat(${maxColumns},1fr)`,
          },
        }}
      >
        {posterList.map((poster, index) => (
          <Flex direction={"column"} key={index} gap={"12px"}>
            <PosterCard
              index={index}
              poster={poster}
              showPromoTag={showPromoTag}
              showStatusTag={showStatusTag}
              showSeller={showSeller}
            />
            {edit && (
              <Flex color={"grey.1"} gap={"16px"}>
                <Button
                  variant={"outline1"}
                  onClick={() => {
                    setPoster(poster);
                    onEditModalOpen();
                  }}
                >
                  Editar
                </Button>
                <Button variant={"outline1"}>Ver detalhes</Button>
              </Flex>
            )}
          </Flex>
        ))}
      </Grid>

      <PosterCreateEditModal
        poster={poster}
        setPosters={setPosters}
        isOpen={isEditModalOpen}
        edit={isEditModalOpen}
        onClose={onEditModalClose}
      />
    </>
  );
};
export default PosterList;
