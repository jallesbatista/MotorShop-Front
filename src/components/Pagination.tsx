import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface IPaginationProps {
  query?: {
    brand?: string;
    model?: string;
    color?: string;
    year?: string;
    fuel?: string;
    page?: string;
  };
  page: number;
  count: number;
}

const Pagination = ({ page, count, query }: IPaginationProps) => {
  const router = useRouter();

  const redirect = () => {
    let redirectLink = "?";
    if (query) {
      Object.entries(query).forEach(([key, value], index) => {
        if (key !== "page") {
          redirectLink += `&${key}=${value}`;
        }
      });
    }

    return redirectLink;
  };

  return (
    <Flex
      mt={{ base: "20px", lg: "104px" }}
      //   direction={{ base: "column", md: "row" }}
      direction={"column"}
      align={"center"}
      justify={"center"}
      gap={"32px"}
      pb={{ base: "45px", lg: "73px" }}
    >
      <Flex gap={"18px"} display={{ base: "flex", md: "none" }}>
        {Math.ceil(count / 12) <= page && page > 1 && (
          <Heading
            as={Link}
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page - 1 || 1,
              },
            }}
            scroll={false}
            role="button"
            color={"brand.1"}
            fontSize={"heading.5"}
            fontWeight={"semibold"}
          >
            {"<"} Anterior
          </Heading>
        )}
        {Math.ceil(count / 12) > page && (
          <Heading
            as={Link}
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page + 1,
              },
            }}
            scroll={false}
            role="button"
            color={"brand.1"}
            fontSize={"heading.5"}
            fontWeight={"semibold"}
          >
            Seguinte {">"}
          </Heading>
        )}
      </Flex>

      <Flex gap={"12px"}>
        {Math.ceil(count / 12) <= page && page > 1 && (
          <Heading
            display={{ base: "none", md: "block" }}
            as={Link}
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page - 1 || 1,
              },
            }}
            scroll={false}
            role="button"
            color={"brand.1"}
            fontSize={"heading.5"}
            fontWeight={"semibold"}
          >
            {"<"} Anterior
          </Heading>
        )}
        <Heading
          lineHeight={"heading.5"}
          letterSpacing={"2px"}
          color={"grey.4"}
          fontSize={"heading.5"}
          fontWeight={"semibold"}
        >
          <Text color={"grey.3"} as="span">
            página {page}
          </Text>{" "}
          de {Math.ceil(count / 12) || 1}
        </Heading>
        {Math.ceil(count / 12) > page && (
          <Heading
            display={{ base: "none", md: "block" }}
            as={Link}
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page + 1,
              },
            }}
            scroll={false}
            role="button"
            color={"brand.1"}
            fontSize={"heading.5"}
            fontWeight={"semibold"}
          >
            Seguinte {">"}
          </Heading>
        )}
      </Flex>
    </Flex>
  );
};

export default Pagination;
