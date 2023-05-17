import { Flex, Spinner } from "@chakra-ui/react";

const Loading = ({ loading }: { loading?: boolean }) => {
  return (
    <Flex
      w={"100%"}
      h={"100%"}
      justify={"center"}
      align={"center"}
      position={"absolute"}
      top={0}
      right={0}
      bg={"whiteAlpha.500"}
    >
      <Spinner
        thickness="6px"
        speed="0.8s"
        emptyColor="brand.4"
        color="brand.1"
        size="xl"
        height={"100px"}
        width={"100px"}
      />
    </Flex>
  );
};

export default Loading;
