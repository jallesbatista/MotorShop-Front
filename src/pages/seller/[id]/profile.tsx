import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import PosterCreateEditModal from "@/components/PosterCreateEditModal";
import PosterList from "@/components/PosterList";
import { IMockedUser } from "@/interfaces/mocks.interfaces";
import { mockedPosterList, mockedUserList } from "@/mocks";
import { Avatar, Box, Button, Flex, Heading, Tag, Text, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";

interface Props {
  seller: IMockedUser;
  isThisSeller: boolean;
}

const Profile: NextPage<Props> = ({ seller, isThisSeller }) => {
  const {
    isOpen: isCreateModalOpen,
    onClose: onCreateModalClose,
    onOpen: onCreateModalOpen,
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
                {/* {seller.description} */}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis repellendus
                molestiae doloremque ad blanditiis facilis quos modi a exercitationem quod. Qui quae
                suscipit laboriosam quos ducimus sequi, eaque hic facilis!
              </Text>

              {isThisSeller && (
                <Box>
                  <Button onClick={onCreateModalOpen} variant={"outlineBrand1"} size={"lg"}>
                    Criar anuncio
                  </Button>
                </Box>
              )}
            </Flex>
          </Flex>
          {/* LISTAGEM */}

          <PosterList
            maxWidth="1300px"
            columns={{ lg: 3, xl: 3 }}
            width={{ lg: "90%", xl: "100%" }}
            posterList={mockedPosterList}
            edit={isThisSeller}
            maxColumns={4}
            showPromoTag={false}
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

        <Footer />
      </Box>
      {/* MODAL DE CRIAÇÂO */}
      <PosterCreateEditModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  // try {
  //   const response = await api.get(`/poster/${ctx.params}`);
  //   return {
  //     props: { poster: response.data },
  //   };
  // } catch (error: any) {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  if (!mockedUserList[+id!]) {
    return {
      redirect: {
        destination: "/notfound",
        permanent: false,
      },
    };
  }

  return {
    props: { seller: mockedUserList[+id!], isThisSeller: true },
  };
};

export default Profile;
