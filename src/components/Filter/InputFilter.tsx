import { Flex, Heading, Input } from "@chakra-ui/react";

const InputFilter = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex direction={"column"}>
        <Heading fontSize={"heading.4"} fontWeight={"semibold"}>
          {children}
        </Heading>

        <Flex gap={"20px"} paddingLeft={"8px"} py={"28px"}>
          <Input
            fontFamily={"Lexend"}
            w={"50%"}
            textAlign={"center"}
            bg={"grey.5"}
            placeholder="Mínimo"
          />
          <Input
            fontFamily={"Lexend"}
            w={"50%"}
            textAlign={"center"}
            bg={"grey.5"}
            placeholder="Máximo"
          />
        </Flex>
      </Flex>
    </>
  );
};
export default InputFilter;
