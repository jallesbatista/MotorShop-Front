import { Iquery } from "@/interfaces/poster.interfaces";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IFilterProps {
  filterList: string[];
  children: React.ReactNode;
  query?: Iquery;
  filterName: "brand" | "model" | "color" | "year" | "fuel";
}

const TextFilter = ({ filterList, children, filterName }: IFilterProps) => {
  const router = useRouter();

  return (
    <>
      <Flex direction={"column"}>
        <Heading fontSize={"heading.4"} fontWeight={"semibold"}>
          {children}
        </Heading>
        <Stack paddingLeft={"8px"} py={"28px"} direction="column">
          {filterList?.length ? (
            filterList.map((filter, index) => (
              <Heading
                as={Link}
                scroll={false}
                href={{
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    [`${filterName}`]: filter,
                  },
                }}
                key={index}
                color={"grey.3"}
                fontSize={"heading.6"}
                fontWeight={"medium"}
              >
                {`${String(filter)[0].toUpperCase()}${String(filter).substring(1)}`}
              </Heading>
            ))
          ) : (
            <Heading color={"grey.3"} fontSize={"heading.6"} fontWeight={"medium"}>
              -
            </Heading>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default TextFilter;
