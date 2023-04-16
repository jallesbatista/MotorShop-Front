import { IMockedPoster } from "@/interfaces/mocks.interfaces";
import { Flex, Grid } from "@chakra-ui/react";
import PosterCard from "./PosterCard";

const PosterList = ({ posterList }: { posterList: IMockedPoster[] }) => {
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
          <PosterCard index={index} poster={poster} key={index} />
        ))}
      </Flex>

      <Grid
        gap={{ md: "100px 0px", lg: "100px 48px" }}
        templateColumns={{ lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }}
        templateRows={{
          lg: `repeat(${Math.ceil(posterList.length / 2)}, 1fr)`,
          xl: `repeat(${posterList.length > 9 ? Math.ceil(posterList.length / 4) : 2}, 1fr)`,
        }}
        w={{ md: "60%", lg: "70%", xl: "80%" }}
        maxW={"1000px"}
        display={{ base: "none", lg: "grid" }}
      >
        {posterList.map((poster, index) => (
          <PosterCard key={index} index={index} poster={poster} />
        ))}
      </Grid>
    </>
  );
};
export default PosterList;
