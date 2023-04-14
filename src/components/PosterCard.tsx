import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Image,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { mockedUser } from "@/mocks";
import { IMockedPoster } from "@/interfaces/mocks.interfaces";
import { useRouter } from "next/router";
const PosterCard = ({ poster, index }: { poster: IMockedPoster; index: number }) => {
  const router = useRouter();

  return (
    <>
      <Card
        flexDirection={"column"}
        bgColor={useColorModeValue("white", "gray.700")}
        maxW="320px"
        minWidth={"300px"}
        gap={"16px"}
        boxShadow={"none"}
        rounded={"4px"}
        data-group
        p={0}
        role="button"
        onClick={() => router.push(`/poster/${index}`)}
      >
        <CardHeader p={0}>
          <Flex flexDirection={"column"} gap={"12px"}>
            <Flex
              className="imageWrapper"
              overflow={"hidden"}
              h={"150px"}
              rounded={"0px 0px 4px 4px"}
              bgColor={"gray.100"}
              justifyContent={"center"}
              border={"2px solid transparent"}
              transition={".3s"}
              _groupHover={{
                rounded: "0px",
                border: "2px solid blue",
                img: {
                  transform: "scale(1.1)",
                },
              }}
              position={"relative"}
            >
              <Image
                transition={".3s"}
                src={poster.images[0].url}
                minW={"100%"}
                w="auto"
                objectFit="fill"
                alt="hm"
                bg={"gray.100"}
              />
              {poster.price < poster.fipe_price && (
                <Flex
                  color={"white"}
                  bgColor={"green.500"}
                  position={"absolute"}
                  w={"16px"}
                  textAlign={"center"}
                  fontWeight={600}
                  rounded={"2px 0px 2px 2px"}
                  fontSize={"1.2rem"}
                  top={0}
                  right={0}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  $
                </Flex>
              )}
            </Flex>
            <Heading
              color={"grey.1"}
              as={"h3"}
              fontSize={"heading.7"}
              fontWeight={"semibold"}
              noOfLines={1}
            >
              {poster.model}
            </Heading>
          </Flex>
        </CardHeader>

        <CardBody p={0}>
          <Flex flexDirection={"column"} gap={"16px"} color={"grey.2"}>
            <Text textAlign={"left"} fontSize={"body.2"} lineHeight={"body.2"} noOfLines={2}>
              {poster.description}
            </Text>
            <Flex alignItems={"center"} gap={"8px"}>
              <Avatar
                sx={{
                  div: {
                    fontSize: "body.2",
                  },
                }}
                name={mockedUser.name}
                width="30px"
                h="30px"
              />
              <Text fontSize={"body.2"} fontWeight={"medium"} noOfLines={1}>
                {mockedUser.name}
              </Text>
            </Flex>
          </Flex>
        </CardBody>

        <CardFooter p={0}>
          <Flex w={"100%"} justify={"space-between"}>
            <Flex gap={"12px"}>
              <Tag fontWeight={"medium"} bgColor={"#EDEAFD"} color={"#4529E6"}>
                {parseFloat(String(poster.kilometers)).toFixed(0)} KM
              </Tag>
              <Tag fontWeight={"medium"} bgColor={"#EDEAFD"} color={"#4529E6"}>
                {poster.year}
              </Tag>
            </Flex>

            <Heading as={"span"} fontSize={"heading.7"} fontWeight={"medium"}>
              {poster.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </Heading>
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
};

export default PosterCard;
