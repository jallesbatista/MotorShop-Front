import { Flex, Heading, Stack } from "@chakra-ui/react";
import Link from "next/link";

interface IFilterProps {
  filterList: string[];
  children: React.ReactNode;
  query?: {
    brand?: string;
    model?: string;
    color?: string;
    year?: string;
    fuel?: string;
  };
}

const TextFilter = ({ filterList, children, query }: IFilterProps) => {
  const redirect = () => {
    let redirectLink = "";

    if (query) {
      Object.entries(query).forEach(([key, value], index) => {
        if (!Object.keys(query).includes(String(children).toLowerCase())) {
          if (index == 0) {
            redirectLink += `?${key}=${value}`;
          } else {
            redirectLink += `&${key}=${value}`;
          }
        } else {
          if (key !== String(children).toLowerCase()) {
            if (index == 0) {
              redirectLink += `?${key}=${value}`;
            } else {
              redirectLink += `&${key}=${value}`;
            }
          }
        }
      });
    }

    return redirectLink;
  };

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
                href={`/${
                  redirect()
                    ? `${redirect()}&${String(children).toLowerCase()}=${filter}`
                    : `?${String(children).toLowerCase()}=${filter}`
                }`}
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
