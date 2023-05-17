import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Pagination from "@/components/Pagination";
import PosterList from "@/components/PosterList";
import { IPosterGet } from "@/interfaces/poster.interfaces";
import { IUser } from "@/interfaces/user.interfaces";
import api from "@/services/api";
import { Avatar, Box, Flex, Heading, SkeletonText, Tag, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SellerPage = () => {
  const [posters, setPosters] = useState<IPosterGet[]>([]);
  const [seller, setSeller] = useState<IUser | null>(null);
  const [sellerLoading, setSellerLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const getSellerData = async () => {
      setSellerLoading(true);
      const { id } = router.query;
      if (id) {
        try {
          const response = await api.get(`/users/${id}/posters`, {
            timeout: 20000,
            params: {
              ...router.query,
              perPage: 12,
            },
          });
          setPosters(response.data.data);
          setCount(response.data.count);
          setSeller(response.data.sellerData);
        } catch (error: any) {
          console.log(error);
          router.push("/404");
        }
      }
      setSellerLoading(false);
    };

    getSellerData();
  }, [router.query]);

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
              name={seller?.name}
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
            <SkeletonText noOfLines={1} skeletonHeight="3" isLoaded={!!seller}>
              <Flex direction={"row"} gap={"8px"}>
                <Heading fontSize={"heading.6"} fontWeight={"semibold"} color={"grey.1"}>
                  {seller?.name}
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
            </SkeletonText>

            <SkeletonText noOfLines={2} spacing={4} isLoaded={!!seller}>
              <Flex direction={"column"} gap={{ base: "12px", md: "36px" }}>
                <Text fontSize={"body.1"} color={"grey.2"}>
                  {seller?.description}
                </Text>
              </Flex>
            </SkeletonText>
          </Flex>
          {/* LISTAGEM */}

          <PosterList
            maxWidth="1300px"
            columns={{ lg: 3, xl: 3 }}
            width={{ lg: "90%", xl: "100%" }}
            posterList={posters}
            edit={false}
            maxColumns={4}
            showPromoTag={false}
            showStatusTag={true}
            showSeller={false}
            setPosters={setPosters}
            isLoading={sellerLoading}
          />
        </Flex>
        <Pagination count={count} page={Number(parseInt(router.query?.page! as string)) || 1} />
      </Box>
      <Footer />
    </>
  );
};

export default SellerPage;
