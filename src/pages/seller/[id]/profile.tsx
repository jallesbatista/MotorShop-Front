import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import Pagination from "@/components/Pagination";
import PosterCreateEditModal from "@/components/PosterCreateEditModal";
import PosterList from "@/components/PosterList";
import SucessModal from "@/components/SuccessModal";
import { authContext } from "@/contexts/AuthContext";
import { IPosterGet } from "@/interfaces/poster.interfaces";
import api from "@/services/api";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  SkeletonText,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";

const Profile: NextPage = () => {
  const [posters, setPosters] = useState<IPosterGet[]>([]);
  const [sellerProfileLoading, setSellerProfileLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  const { user } = authContext();
  const router = useRouter();

  useEffect(() => {
    const getSellerProfileData = async () => {
      setSellerProfileLoading(true);
      const { id } = router.query;
      if (id) {
        try {
          const response = await api.get(`/users/${id}/posters`, {
            params: {
              ...router.query,
              perPage: 12,
            },
          });

          setPosters(response.data.data);
          setCount(response.data.count);
          // setSeller(response.data.sellerData);
        } catch (error: any) {
          console.log(error.cause);

          router.push("/404");
        }
      }
      setSellerProfileLoading(false);
    };
    getSellerProfileData();
  }, [router.query]);

  const {
    isOpen: isCreateModalOpen,
    onClose: onCreateModalClose,
    onOpen: onCreateModalOpen,
  } = useDisclosure();

  const {
    isOpen: isSucessModalOpen,
    onClose: onSucessModalClose,
    onOpen: onSucessModalOpen,
  } = useDisclosure();

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
            p={{ base: "40px 26px", md: "44px" }}
            w={"90%"}
            maxWidth={"1100px"}
            gap={"24px"}
          >
            <Avatar
              name={user?.name}
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
            <SkeletonText noOfLines={1} skeletonHeight="3" isLoaded={!!user}>
              <Flex direction={"row"} gap={"8px"}>
                <Heading fontSize={"heading.6"} fontWeight={"semibold"} color={"grey.1"}>
                  {user?.name}
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

            <Flex direction={"column"} gap={{ base: "12px", md: "36px" }}>
              <SkeletonText noOfLines={2} spacing={4} isLoaded={!!user}>
                <Text fontSize={"body.1"} color={"grey.2"}>
                  {user?.description}
                </Text>
              </SkeletonText>

              <Box>
                <Button
                  isLoading={!user}
                  onClick={onCreateModalOpen}
                  variant={"outlineBrand1"}
                  size={"lg"}
                >
                  Criar anuncio
                </Button>
              </Box>
            </Flex>
          </Flex>
          {/* LISTAGEM */}

          <PosterList
            maxWidth="1300px"
            columns={{ lg: 3, xl: 3 }}
            width={{ lg: "90%", xl: "100%" }}
            posterList={posters}
            edit={true}
            maxColumns={4}
            showPromoTag={false}
            showStatusTag={true}
            showSeller={false}
            setPosters={setPosters}
            isLoading={sellerProfileLoading}
          />

          <Pagination count={count} page={Number(parseInt(router.query?.page! as string)) || 1} />
        </Flex>
      </Box>
      <Footer />
      {/* MODAL DE CRIAÇÂO */}
      <PosterCreateEditModal
        setPosters={setPosters}
        isOpen={isCreateModalOpen}
        onClose={onCreateModalClose}
        onSucessModalOpen={onSucessModalOpen}
      />
      <SucessModal
        isOpen={isSucessModalOpen}
        onClose={onSucessModalClose}
        title="Seu anúncio foi criado com sucesso!"
        description="Agora você poderá ver seus negócios crescendo em grande escala"
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const userId = cookies["ecommerce.user.id"];
  const isSeller = cookies["ecommerce.user.seller"];
  const token = cookies["ecommerce.token"];

  if (!token || userId !== ctx.params!.id || isSeller !== "true") {
    return {
      redirect: {
        destination: `/seller/${ctx.params!.id}`,
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default Profile;
