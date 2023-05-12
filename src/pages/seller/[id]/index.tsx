import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import PosterList from "@/components/PosterList";
import { IPosterGet } from "@/interfaces/poster.interfaces";
import { IUser } from "@/interfaces/user.interfaces";
import api from "@/services/api";
import { Avatar, Box, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

interface Props {
  seller: IUser;
  posterList: IPosterGet[];
  count: number;
}

const SellerPage: NextPage<Props> = ({ seller, posterList }) => {
  const [posters, setPosters] = useState<IPosterGet[]>(posterList || []);
  return (
    <>
      <Header />
      <Box
        paddingTop={"135px"}
        w={"100%"}
        bgGradient={{
          base: "linear(to-b, brand.1 0%, brand.1 20%, grey.8 20%, grey.8 100%)",
          md: "linear(to-b, brand.1 0px, brand.1 350px, grey.8 350px, grey.8 100%)",
        }}
        pb={{ base: "45px", md: "73px" }}
      >
        {/* ORGANIZAÇÂO DO BODY EM PROFILE DATA E LISTAGEM DE ANUNCIOS */}
        <Flex direction={"column"} color={"grey.1"} w={"100%"} align={"center"} gap={"72px"}>
          {/* PROFILE */}
          <Flex
            direction={"column"}
            bg={"grey.10"}
            rounded={"4px"}
            p={{ base: "40px 26px", md: "44px 44px 50px 44px" }}
            w={"90%"}
            maxWidth={"1100px"}
            gap={"24px"}
          >
            <Avatar
              name={seller.name}
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
            <Flex direction={"row"} gap={"8px"}>
              <Heading fontSize={"heading.6"} fontWeight={"semibold"} color={"grey.1"}>
                {seller.name}
              </Heading>
              <Tag
                fontWeight={"medium"}
                fontSize={"body.2"}
                bgColor={"brand.4"}
                color={"brand.1"}
                rounded={"4px"}
                p={"4px 8px"}
              >
                Anunciante
              </Tag>
            </Flex>

            <Flex direction={"column"} gap={{ base: "12px", md: "36px" }}>
              <Text fontSize={"body.1"} color={"grey.2"}>
                {seller.description}
              </Text>
            </Flex>
          </Flex>
          {/* LISTAGEM */}

          <PosterList
            maxWidth="1300px"
            columns={{ lg: 3, xl: 3 }}
            width={{ lg: "90%", xl: "100%" }}
            posterList={posterList}
            edit={false}
            maxColumns={4}
            showPromoTag={false}
            showStatusTag={true}
            showSeller={false}
            setPosters={setPosters}
          />

          <Flex
            mt={{ base: "20px", lg: "104px" }}
            direction={{ base: "column", md: "row" }}
            align={"center"}
            justify={"center"}
            gap={"32px"}
          >
            <Heading
              lineHeight={"heading.5"}
              letterSpacing={"2px"}
              color={"grey.4"}
              fontSize={"heading.5"}
              fontWeight={"semibold"}
            >
              <Text color={"grey.3"} as="span">
                1
              </Text>{" "}
              de 2
            </Heading>
            <Heading role="button" color={"brand.1"} fontSize={"heading.5"} fontWeight={"semibold"}>
              Seguinte {">"}
            </Heading>
          </Flex>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { page } = ctx.query;

  try {
    const response = await api.get(`/users/${ctx.params!.id}/posters?perPage=12`);

    return {
      props: {
        posterList: response.data.data,
        seller: response.data.sellerData,
        count: response.data.count,
      },
    };
  } catch (error: any) {
    console.log(error.cause);
    return {
      notFound: true,
    };
  }
};

export default SellerPage;
