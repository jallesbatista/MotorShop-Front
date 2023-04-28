import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { userContext } from "@/contexts/UserContext";
import { IForgotPassword } from "@/interfaces/forgotPassword.interfaces";
import { forgotPasswordSchema } from "@/schemas";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { sendResetPassworEmail } = userContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (formData: IForgotPassword) => {
    sendResetPassworEmail(formData);
  };

  return (
    <>
      <Header />
      <Box h={"90px"} />
      <Center>
        <Box
          maxW={"560px"}
          mt={"46px"}
          mb={"75px"}
          w={"90%"}
          p={{ base: "44px 24px", sm: "44px 48px" }}
          bg={"grey.10"}
          rounded={"4px"}
          fontWeight={"semibold"}
        >
          <Heading textAlign={"center"} mb={"32px"} fontSize={"heading.5"}>
            Esqueceu sua senha ?
          </Heading>
          <VStack
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            spacing={"24px"}
            direction={"column"}
          >
            <Text>
              Preencha com o e-mail que você usou para se cadastrar. Você receberá um e-mail com
              instruções sobre como redefinir sua senha.
            </Text>
            <FormControl id="email" isInvalid={!!errors.email?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Email
              </FormLabel>
              <Input type="email" {...register("email")} placeholder="Endereço de email" />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <Button size={"lg"} type="submit" variant={"brand1"} alignSelf={"center"} w={"100%"}>
              Enviar email
            </Button>
          </VStack>
        </Box>
      </Center>
      <Footer />
    </>
  );
};

export default ForgotPassword;
