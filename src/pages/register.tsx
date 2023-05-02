import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useRadioGroup,
} from "@chakra-ui/react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { IRegister } from "@/interfaces/user.interfaces";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CustomRadioButton from "@/components/CustomRadioButton";
import { userContext } from "@/contexts/UserContext";
import { CEPMask, CPFMask, PhoneMask } from "@/functions/masks";
import SucessModal from "@/components/SuccessModal";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { userCreate } = userContext();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
  });

  const radioOptions = ["buyer", "advertiser"];
  const radioOptionsName = ["Comprador", "Anuciante"];

  const { field } = useController({
    name: "user_type",
    control: control,
    defaultValue: "buyer",
  });

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...field,
    onChange: field.onChange,
    value: field.value,
  });

  const group = getRootProps();

  const onSubmit = async (formData: IRegister) => {
    const { user_type, confirmPassword, ...data } = formData;

    const showModal = await userCreate(data);

    if (showModal) {
      onOpen();
    }
  };

  return (
    <>
      <Header />
      <Box h={"80px"}></Box>

      <Flex
        pb={{ base: "45px", md: "73px" }}
        w={"100%"}
        justify={"center"}
        align={"center"}
        bg={"grey.8"}
      >
        <Box
          maxW={"560px"}
          mt={"46px"}
          w={"90%"}
          p={{ base: "44px 24px", sm: "44px 48px" }}
          bg={"grey.10"}
          rounded={"4px"}
          fontWeight={"semibold"}
        >
          <Heading mb={"32px"} fontSize={"heading.5"}>
            Cadastro
          </Heading>
          <VStack
            spacing={"24px"}
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            direction={"column"}
          >
            <Text alignSelf={"flex-start"} fontSize={"body.2"}>
              Informações pessoais
            </Text>
            <FormControl id="name" isInvalid={!!errors.name?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Nome
              </FormLabel>
              <Input type="text" {...register("name")} placeholder="Ex: Samuel Leão" />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Email
              </FormLabel>
              <Input type="email" {...register("email")} placeholder="Ex: example@mail.com" />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="cpf" isInvalid={!!errors.cpf?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                CPF
              </FormLabel>
              <Input
                maxLength={14}
                type="cpf"
                {...register("cpf", {
                  onChange(e: React.ChangeEvent<HTMLInputElement>) {
                    CPFMask(e);
                  },
                })}
                placeholder="000.000.000-00"
              />
              <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="phone" isInvalid={!!errors.phone?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Celular
              </FormLabel>
              <Input
                type="tel"
                maxLength={15}
                {...register("phone", {
                  onChange(e: React.ChangeEvent<HTMLInputElement>) {
                    PhoneMask(e);
                  },
                })}
                placeholder="(DDD) 9****-****"
              />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="birth_date" isInvalid={!!errors.birth_date?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Data de nascimento
              </FormLabel>
              <Input
                {...register("birth_date")}
                placeholder="Selecione a sua data de nascimento"
                size="md"
                type="date"
              />
              <FormErrorMessage>{errors.birth_date?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="description" isInvalid={!!errors.description?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Descrição
              </FormLabel>
              <Textarea
                maxLength={350}
                {...register("description")}
                placeholder="Digitar descrição"
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>

            <VStack alignItems={"flex-start"} spacing={"24px"}>
              <Text>Informações de endereço</Text>
              <FormControl id="zip_code" isInvalid={!!errors.address?.zip_code?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                  CEP
                </FormLabel>
                <Input
                  type="text"
                  {...register("address.zip_code", {
                    onChange(e: React.ChangeEvent<HTMLInputElement>) {
                      CEPMask(e);
                    },
                  })}
                  maxLength={9}
                  placeholder="00000-000"
                />
                <FormErrorMessage>{errors.address?.zip_code?.message}</FormErrorMessage>
              </FormControl>
              <HStack alignItems={"flex-start"}>
                <FormControl id="state" isInvalid={!!errors.address?.state?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                    Estado
                  </FormLabel>
                  <Input
                    maxLength={2}
                    type="text"
                    {...register("address.state", {
                      onChange(e: React.ChangeEvent<HTMLInputElement>) {
                        let value = e.target.value;
                        value = value.replace(/\d/g, "");
                        value = value.toUpperCase();
                        e.target.value = value;
                        return e;
                      },
                    })}
                    placeholder="Digitar estado"
                  />
                  <FormErrorMessage>{errors.address?.state?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="city" isInvalid={!!errors.address?.city?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                    Cidade
                  </FormLabel>
                  <Input type="text" {...register("address.city")} placeholder="Digitar cidade" />
                  <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
                </FormControl>
              </HStack>
              <FormControl id="street" isInvalid={!!errors.address?.street?.message}>
                <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                  Rua
                </FormLabel>
                <Input type="text" {...register("address.street")} placeholder="Digitar rua" />
                <FormErrorMessage>{errors.address?.street?.message}</FormErrorMessage>
              </FormControl>
              <HStack alignItems={"flex-start"}>
                <FormControl id="number" isInvalid={!!errors.address?.number?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                    Número
                  </FormLabel>
                  <Input
                    maxLength={6}
                    type="text"
                    {...register("address.number")}
                    placeholder="Digitar número"
                  />
                  <FormErrorMessage>{errors.address?.number?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="complement" isInvalid={!!errors.address?.complement?.message}>
                  <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                    Complemento
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("address.complement")}
                    placeholder="Ex: apart 307"
                  />
                  <FormErrorMessage>{errors.address?.complement?.message}</FormErrorMessage>
                </FormControl>
              </HStack>
            </VStack>
            <VStack w={"100%"} alignItems={"flex-start"} spacing={"24px"}>
              <Text color={"black"} fontSize={"body.2"}>
                Tipo de conta
              </Text>
              <HStack w={"100%"} {...group}>
                {radioOptions.map((value, index) => {
                  const radio = { ...getRadioProps({ value }) };
                  return (
                    <CustomRadioButton key={value} {...radio}>
                      {radioOptionsName[index]}
                    </CustomRadioButton>
                  );
                })}
              </HStack>
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
            </VStack>
            <Button size={"lg"} type="submit" variant={"brand1"} alignSelf={"center"} w={"100%"}>
              Finalizar cadastro
            </Button>
          </VStack>
        </Box>
      </Flex>
      <SucessModal
        redirect={{ redirectButton: true, redirectTo: "/login", buttonText: "Ir para o login" }}
        title="Sua conta foi criada com sucesso!"
        description="Agora você poderá ver seus negócios crescendo em grande escala"
        isOpen={isOpen}
        onClose={onClose}
      />
      <Footer />
    </>
  );
};

export default Register;
