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
} from "@chakra-ui/react";
import { IPosterGet } from "@/interfaces/poster.interfaces";
import Link from "next/link";

const PosterCard = ({
  poster,
  index,
  showPromoTag,
  showStatusTag,
  showSeller,
}: {
  poster: IPosterGet;
  index: number;
  showPromoTag: boolean;
  showStatusTag: boolean;
  showSeller: boolean;
}) => {
  return (
    <>
      <Card
        flexDirection={"column"}
        bgColor={"transparent"}
        w={"300px"}
        gap={"16px"}
        boxShadow={"none"}
        rounded={"4px"}
        data-group
        p={0}
        as={Link}
        href={`/poster/${poster.id}`}
      >
        <CardHeader p={0}>
          <Flex flexDirection={"column"} gap={"12px"}>
            <Flex
              className="imageWrapper"
              overflow={"hidden"}
              h={"150px"}
              rounded={"0px 0px 4px 4px"}
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
                src={poster?.images[0]?.url}
                w={"100%"}
                maxW={"100%"}
                maxH={"100%"}
                objectFit={"contain"}
                alt="vehicle image"
                bg={"grey.7"}
              />
              {poster.price < poster.fipe_price && showPromoTag && (
                <Flex
                  color={"white"}
                  bgColor={"green.500"}
                  position={"absolute"}
                  w={"16px"}
                  h={"27px"}
                  textAlign={"center"}
                  fontWeight={"medium"}
                  rounded={"2px 0px 2px 2px"}
                  fontSize={"body.2 "}
                  top={0}
                  right={0}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  $
                </Flex>
              )}

              {showStatusTag && (
                <Flex
                  px={"8px"}
                  position={"absolute"}
                  top={"10px"}
                  left={"16px"}
                  bg={poster.is_published ? "brand.1" : "grey.4"}
                  color={"white"}
                  fontSize={"body.2"}
                  textAlign={"center"}
                  alignItems={"center"}
                  h={"24px"}
                >
                  {poster.is_published ? <Text>Ativo</Text> : <Text>Inativo</Text>}
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
              {`${poster.model[0].toUpperCase()}${poster.model.substring(1)}`}
            </Heading>
          </Flex>
        </CardHeader>

        <CardBody p={0}>
          <Flex flexDirection={"column"} gap={"16px"} color={"grey.2"}>
            <Text
              h={"48px"}
              textAlign={"left"}
              fontSize={"body.2"}
              lineHeight={"body.2"}
              noOfLines={2}
            >
              {poster.description}
            </Text>
            {showSeller && (
              <Flex alignItems={"center"} gap={"8px"}>
                <Avatar
                  sx={{
                    div: {
                      fontSize: "body.2",
                    },
                  }}
                  name={poster?.user?.name}
                  width="30px"
                  h="30px"
                />
                <Text fontSize={"body.2"} fontWeight={"medium"} noOfLines={1}>
                  {poster?.user?.name}
                </Text>
              </Flex>
            )}
          </Flex>
        </CardBody>

        <CardFooter p={0}>
          <Flex w={"100%"} justify={"space-between"}>
            <Flex gap={"12px"}>
              <Tag
                p={"4px 8px"}
                fontWeight={"medium"}
                bgColor={"brand.4"}
                color={"brand.1"}
                rounded={"4px"}
              >
                {parseFloat(String(poster.kilometers)).toFixed(0)} KM
              </Tag>
              <Tag
                p={"4px 8px"}
                fontWeight={"medium"}
                bgColor={"brand.4"}
                color={"brand.1"}
                rounded={"4px"}
              >
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
