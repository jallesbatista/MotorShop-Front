import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import PosterImageModal from "@/components/PosterImageModal";
import { authContext } from "@/contexts/AuthContext";
import { IMockedPoster } from "@/interfaces/mocks.interfaces";
import { mockedPosterList } from "@/mocks";
import api from "@/services/api";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Tag,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  poster: IMockedPoster;
}

const PosterDetail: NextPage<Props> = ({ poster }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [posterImage, setPosterImage] = useState<string>("");
  const router = useRouter();
  const { user } = authContext();

  const handleBuy = () => {
    if (!poster.is_published) {
      return null;
    } else if (!user) {
      return router.push("/login");
    }
    // colocar no retorno a função de compra
    return null;
  };

  return (
    <>
      <Header />
      <Box
        paddingTop={"125px"}
        pb={{ base: "45px", md: "73px" }}
        w={"100%"}
        bgGradient={{
          base: "linear(to-b, brand.1 0%, brand.1 23%, grey.8 23%, grey.8 100%)",
          md: "linear(to-b, brand.1 0px, brand.1 600px, grey.8 600px, grey.8 100%)",
        }}
      >
        <Container
          display={"flex"}
          gap={{ base: "16px", md: "46px" }}
          p={0}
          flexDirection={{ base: "column", md: "row" }}
          maxW={"1300px"}
          w={"90%"}
          color={"grey.1"}
          minH={"100vh"}
        >
          <Flex w={{ base: "100%", md: "65%" }} direction={{ base: "column" }} gap={"18px"}>
            {/* IMAGEM DO POSTER  */}
            <Flex
              rounded={"4px"}
              overflow={"hidden"}
              align={"center"}
              justify={"center"}
              bg={"grey.10"}
            >
              <Image
                h={"355px"}
                src={poster?.images[0].url}
                w={"auto"}
                role={"button"}
                onClick={() => {
                  setPosterImage(poster?.images[0].url);
                  onOpen();
                }}
                maxW={"100%"}
                objectFit={{ base: "contain", md: "fill" }}
              />
            </Flex>
            {/*IMAGEM DO POSTER */}

            {/* DETAILS */}
            <Flex
              bg={"grey.10"}
              rounded={"4px"}
              direction={"column"}
              p={{ base: "44px 28px 28px 28px", md: "44px 44px 28px 44px" }}
              gap={{ base: "32px", md: "24px" }}
            >
              <Flex direction={"column"} align={"right"} gap={{ base: "32px", md: "32px" }}>
                <VStack align={"right"}>
                  {!poster?.is_published && (
                    <Text
                      as={"span"}
                      color={"grey.4"}
                      fontSize={"body.2"}
                      lineHeight={"heading.6"}
                      textAlign={"end"}
                      fontWeight={"semibold"}
                    >
                      Anúncio Inativo
                    </Text>
                  )}
                  <Heading as={"h2"} fontSize={"heading.6"} lineHeight={"heading.6"}>
                    {`${poster?.model.split("")[0].toUpperCase()}${poster?.model.substring(1)}`}
                  </Heading>
                </VStack>

                <Flex gap={"12px"}>
                  <Tag
                    fontSize={"body.2"}
                    fontWeight={"semibold"}
                    bgColor={"brand.4"}
                    color={"brand.1"}
                    rounded={"4px"}
                  >
                    {poster?.year}
                  </Tag>
                  <Tag
                    fontSize={"body.2"}
                    fontWeight={"semibold"}
                    bgColor={"brand.4"}
                    color={"brand.1"}
                    rounded={"4px"}
                  >
                    {poster?.kilometers} KM
                  </Tag>
                </Flex>
              </Flex>

              <Text fontSize={"body.1"} fontWeight={"bold"}>
                {poster?.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </Text>

              <Box>
                <Button
                  _disabled={{ _hover: { bg: "grey.5" } }}
                  variant={user && poster.is_published ? "brand1" : "disable"}
                  onClick={handleBuy}
                >
                  Comprar
                </Button>
              </Box>
            </Flex>
            {/* DETAILS */}

            {/* DESCRIPTION */}
            <Flex
              p={{ base: "36px 28px", md: "36px 44px" }}
              bg={"grey.10"}
              rounded={"4px"}
              direction={"column"}
              gap={"32px"}
              mt={{ base: "8px", md: "24px" }}
            >
              <Heading fontSize={"heading.6"} fontWeight={"bold"}>
                Descrição
              </Heading>
              <Text color={"grey.2"} fontSize={"body.1"} lineHeight={"body.1"}>
                {poster?.description}
              </Text>
            </Flex>
            {/* DESCRIPTION */}
          </Flex>

          {/* SECOND COLUMN */}
          <Flex
            w={{ base: "100%", md: "35%" }}
            direction={"column"}
            gap={{ base: "52px", md: "34px" }}
          >
            {/* IMAGES */}
            <Flex
              w={"100%"}
              direction={"column"}
              gap={"32px"}
              bg={"grey.10"}
              p={{ base: "36px 40px", md: "36px 24px", lg: "36px 40px" }}
              rounded={"4px"}
            >
              <Heading fontSize={"heading.6"} fontWeight={"semibold"}>
                Fotos
              </Heading>
              <Grid
                templateColumns="repeat(3, 1fr)"
                templateRows="repeat(2, 1fr)"
                gap={{ base: "50px 5px", sm: "32px 14px" }}
              >
                {poster.images.map((img, index) => (
                  <GridItem
                    role={"button"}
                    rounded={"4px"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    onClick={() => {
                      setPosterImage(img.url);
                      onOpen();
                    }}
                    w={"auto"}
                    h={"auto"}
                    key={index}
                    bg={"grey.7"}
                    p={2}
                  >
                    <Image src={img.url} w={"auto"} maxW={"100%"} objectFit={"fill"} />
                  </GridItem>
                ))}
              </Grid>
            </Flex>
            {/* IMAGES */}

            {/* PROFILE */}
            <Flex
              rounded={"4px"}
              bg={"grey.10"}
              direction={"column"}
              align={"center"}
              gap={"28px"}
              p={{ base: "40px 28px", md: "36px 44px" }}
            >
              <Avatar
                name={poster?.user.name}
                width={{ base: "77px", md: "104px" }}
                h={{ base: "77px", md: "104px" }}
                sx={{
                  div: {
                    fontSize: {
                      base: "heading.4",
                      md: "heading.2",
                    },
                    fontWeight: "medium",
                  },
                }}
              />
              <Flex
                direction={"column"}
                align={"center"}
                justify={"center"}
                gap={{ base: "28px", md: "32px" }}
              >
                <Heading
                  textAlign={"center"}
                  fontWeight={"semibold"}
                  fontSize={"heading.6"}
                  as={"h2"}
                >
                  {poster?.user.name}
                </Heading>
                <Text
                  lineHeight={"body.1"}
                  textAlign={"center"}
                  color={"grey.2"}
                  fontSize={"body.1"}
                  noOfLines={5}
                >
                  {poster?.user.description}
                </Text>

                <Button size={"lg"} as={Link} href={`/seller/${poster?.user.id}`}>
                  Ver todos os anuncios
                </Button>
              </Flex>
            </Flex>
          </Flex>
          {/* SECOND COLUMN */}
        </Container>
      </Box>
      <Footer />
      <PosterImageModal isOpen={isOpen} onClose={onClose} posterImage={posterImage} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { id } = ctx.query;

  try {
    const response = await api.get(`/posters/${ctx.params!.id}`);
    return {
      props: { poster: response.data },
    };
  } catch (error: any) {
    // return {
    //   redirect: {
    //     destination: "/",
    //     permanent: false,
    //   },
    // };
    // console.log(error.response);

    return {
      props: { poster: mockedPosterList[1] },
    };
  }
};

export default PosterDetail;
