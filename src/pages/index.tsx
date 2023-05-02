import Filter from "@/components/Filter/Filter";
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import PosterList from "@/components/PosterList";
import { IPoster, IPosterFilters } from "@/interfaces/poster.interfaces";
import { mockedPosterList } from "@/mocks";
import api from "@/services/api";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import bgImage from "../assets/bgHome.png";

interface Props {
  posterList: IPoster[];
  error: string;
  filters: IPosterFilters;
  query?: {
    brand?: string;
    model?: string;
    color?: string;
    year?: string;
    fuel?: string;
  };
}

const Home: NextPage<Props> = ({ posterList, error, filters, query }) => {
  const [page, setPage] = useState<number>(1);

  return (
    <>
      <Header />
      <Box h={"80px"} />
      <Flex
        w={"100%"}
        height={{ base: "60vh", md: "50vh" }}
        color={"grey.10"}
        bg={`url(${bgImage.src}) no-repeat center`}
        position={"relative"}
        bgSize={"cover"}
      >
        <Flex
          justify={"center"}
          align={"center"}
          position={"absolute"}
          h={"100%"}
          w={"100%"}
          bgGradient={"linear(to-b,  blackAlpha.500, black 95%, black 100%)"}
          zIndex={"1"}
          bottom={0}
        >
          <Flex
            gap={{ base: "30px", md: "0" }}
            direction={"column"}
            textAlign={"center"}
            transform={{ base: "translateY(-80px)", md: "translateY(0px)" }}
            w={"90%"}
          >
            <Heading
              fontSize={{ base: "heading.3", md: "heading.1" }}
              fontWeight={{ base: "medium", md: "bold" }}
              as={"h2"}
            >
              Motors Shop{" "}
            </Heading>
            <Heading
              fontSize={{ base: "heading.5", md: "heading.2" }}
              fontWeight={{ base: "medium", md: "semibold" }}
              as={"h2"}
            >
              A melhor plataforma de anúncios de carros do país
            </Heading>
          </Flex>
        </Flex>
      </Flex>
      <Container p={0} maxWidth={"1600px"}>
        <Flex
          gap={{ base: "80px", lg: "40px" }}
          direction={{ base: "column", lg: "row-reverse" }}
          justify={{ base: "none", md: "space-between" }}
          p={{ base: "70px 0px 70px 0px", lg: "60px 63px 60px 30px" }}
        >
          <PosterList
            maxWidth="1000px"
            width={{ lg: "70%", xl: "80%" }}
            columns={{ lg: 2, xl: 3 }}
            maxColumns={3}
            posterList={posterList}
            showPromoTag={true}
            showStatusTag={false}
            showSeller={true}
          />
          <Filter filters={filters} query={query} />
        </Flex>
      </Container>
      <Flex
        mt={{ base: "20px", lg: "104px" }}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        justify={"center"}
        gap={"32px"}
        pb={{ base: "45px", md: "73px" }}
      >
        <Heading
          lineHeight={"heading.5"}
          letterSpacing={"2px"}
          color={"grey.4"}
          fontSize={"heading.5"}
          fontWeight={"semibold"}
        >
          <Text color={"grey.3"} as="span">
            {page}
          </Text>{" "}
          de 2
        </Heading>
        <Heading role="button" color={"brand.1"} fontSize={"heading.5"} fontWeight={"semibold"}>
          Seguinte {">"}
        </Heading>
      </Flex>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const expectedFilters = [
    "brand",
    "model",
    "color",
    "year",
    "fuel",
    "priceMAX",
    "priceMIN",
    "kmMAX",
    "kmMIN",
  ];
  let queryUrl = "?";

  Object.entries(ctx.query).forEach(([key, value], index) => {
    if (expectedFilters.includes(key)) {
      if (index == 0) {
        queryUrl += `${key}=${value}`;
      } else {
        queryUrl += `&${key}=${value}`;
      }
    }
  });

  try {
    const [posters, filters] = await Promise.all([
      // BUSCA ATUALIZADA DOS ANUNCIOS PUBLICADOS E FILTRO PARA OS MESMOS
      // api.get(
      //   `/posters${queryUrl ? queryUrl + "&perPage=12&published=1" : "?perPage=12&published=1"}`
      // ),
      // api.get(`/posters/filters${queryUrl ? queryUrl + "&published=1" : "?published=1"}`),

      // BUSCA GERAL DE TODOS OS ANUNCIO E FILTROS (DEIXAR SOMENTE PARA TESTES)
      api.get(`/posters${queryUrl ? queryUrl + "&perPage=12" : "?perPage=12"}`),
      api.get(`/posters/filters${queryUrl}`),
    ]);
    return {
      props: {
        posterList: posters.data.data,
        filters: filters.data,
        query: ctx.query,
      },
    };
  } catch (error: any) {
    console.log(error.cause);
    return {
      props: {
        posterList: [],
        filters: [],
        query: ctx.query,
      },
    };
  }
};

export default Home;
