import { Checkbox, Flex, Heading, Stack } from "@chakra-ui/react";

interface IFilterProps {
  filterList: string[];
  children: React.ReactNode;
}

const TextFilter = ({ filterList, children }: IFilterProps) => {
  return (
    <>
      <Flex direction={"column"}>
        <Heading fontSize={"heading.4"} fontWeight={"semibold"}>
          {children}
        </Heading>
        <Stack paddingLeft={"8px"} py={"28px"} direction="column">
          {filterList.map((filter, index) => (
            <Checkbox value={filter} key={index}>
              <Heading color={"grey.3"} fontSize={"heading.6"} fontWeight={"medium"}>
                {filter}
              </Heading>
            </Checkbox>
          ))}
        </Stack>
      </Flex>
    </>
  );
};

export default TextFilter;
