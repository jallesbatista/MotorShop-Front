import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { authContext } from "@/contexts/AuthContext";
import { IUserLogin } from "@/interfaces/user.interfaces";
import { loginSchema } from "@/schemas";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  VStack,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import nookies from "nookies";
import { GetServerSideProps } from "next";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = authContext();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IUserLogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: IUserLogin) => {
    logIn(data);
  };
  return (
    <>
      <Header />

      <Flex
        w={"100%"}
        pt={{ base: "132px", md: "200px" }}
        pb={{ base: "70px", sm: "120px" }}
        minH={"100vh"}
        bg={"grey.8"}
        align={"flex-start"}
        justify={"center"}
      >
        <Box
          w={"90%"}
          maxW={"412px"}
          bg={"white.1"}
          color={"grey.1"}
          p={{ base: "44px 28px", sm: "44px 48px" }}
          rounded={"4px"}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Heading
            color={"black"}
            fontWeight={"semibold"}
            fontSize={"heading.5"}
            textAlign={"initial"}
            mb={"32px"}
          >
            Login
          </Heading>
          <VStack spacing={"24px"}>
            <FormControl isInvalid={!!errors.email?.message}>
              <FormLabel fontWeight="semibold" fontSize={"body.2"}>
                Email
              </FormLabel>
              <Input {...register("email")} placeholder="Digitar email" type="email" />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormLabel fontWeight="semibold" fontSize={"body.2"}>
                Senha
              </FormLabel>
              <InputGroup>
                <Input
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Digitar senha"
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    _hover={{}}
                    _active={{}}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
          <Text
            as={Link}
            href={"/forgotPassword"}
            textAlign="end"
            fontSize={"body.2"}
            mt={"4px"}
            mb={"22px"}
            display={"block"}
          >
            Esqueci minha senha
          </Text>
          <VStack w={"100%"} spacing={"24px"}>
            <Button size={"lg"} w={"100%"} type="submit" variant={"brand1"}>
              Entrar
            </Button>
            <Text textAlign="center" fontSize={"body.2"}>
              Ainda não possui conta?
            </Text>
            <Button as={Link} href={"/register"} variant={"outline2"} size={"lg"} w={"100%"}>
              Cadastrar
            </Button>
          </VStack>
        </Box>
      </Flex>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["ecommerce.token"];
  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
export default Login;
