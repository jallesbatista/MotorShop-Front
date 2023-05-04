import { Flex } from "@chakra-ui/react";

interface IEmptyMessageBoxProps {
  children: React.ReactNode;
}

const EmptyMessageBox = ({ children }: IEmptyMessageBoxProps) => {
  return (
    <>
      <Flex minH={"50px"} w={"100¨%"} alignItems={"center"} justifyContent={"center"}>
        {children}
      </Flex>
    </>
  );
};

export default EmptyMessageBox;
