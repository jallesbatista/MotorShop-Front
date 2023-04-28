import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import { IResetPassword } from "@/interfaces/resetPassword.interfaces";
import { resetPasswordSchema } from "@/schemas";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { userContext } from "@/contexts/UserContext";
import SucessModal from "@/components/SuccessModal";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { resetPassword } = userContext();
  const router = useRouter();
  const { resetToken } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (formData: IResetPassword) => {
    const { confirmPassword, ...password } = formData;

    const showModal = await resetPassword(password, String(resetToken));

    if (showModal) {
      onOpen();
    }
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
            Crie sua nova senha.
          </Heading>
          <VStack
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            spacing={"24px"}
            direction={"column"}
          >
            <Text>Preencha com a sua nova senha.</Text>
            <FormControl id="password" isInvalid={!!errors.password?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
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
            <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Confirmar senha
              </FormLabel>
              <InputGroup>
                <Input
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Digitar senha"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}
                    _hover={{}}
                    _active={{}}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <Button size={"lg"} type="submit" variant={"brand1"} alignSelf={"center"} w={"100%"}>
              Criar nova senha
            </Button>
          </VStack>
        </Box>
      </Center>
      <Footer />
      <SucessModal
        redirect={{ redirectButton: true, redirectTo: "/login", buttonText: "Ir para o Login" }}
        title="Sua senha foi atualizada com sucesso!"
        description="Agora você poda acessar sua conta novamente."
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ResetPassword;
