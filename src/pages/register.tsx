import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useRadioGroup,
} from "@chakra-ui/react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import { IRegister } from "@/interfaces/register.interface";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CustomRadioButton from "@/components/CustomRadioButton";
import ModalSuccessRegister from "@/components/ModalSuccessRegister";
import { userContex } from "@/contexts/UserContext";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { userCreate, successModal, setSuccessModal } = userContex();

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

  const onSubmit = (formData: IRegister) => {
    const { user_type, confirmPassword, ...data } = formData;

    user_type === "buyer" ? (data.is_seller = false) : (data.is_seller = true);

    userCreate(data);

    setSuccessModal(false);
  };

  return (
    <>
      <Header />
      <Box h={"80px"}></Box>
      <Container maxW={"360px"}>
        <Center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack alignItems={"flex-start"} spacing={"25px"}>
              <Heading>Cadastro</Heading>
              <VStack alignItems={"flex-start"} spacing={"10px"}>
                <Text>Informações pessoais</Text>
                <FormControl id="name" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>Nome</FormLabel>
                  <Input required type="text" {...register("name")} placeholder="Ex: Samuel leão" />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="email" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    required
                    type="email"
                    {...register("email")}
                    placeholder="Ex: samuel@kenzie.com.br"
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="cpf" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>CPF</FormLabel>
                  <Input required type="cpf" {...register("cpf")} placeholder="000.000.000-(00)" />
                  <FormErrorMessage>{errors.cpf?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="phone" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>Celular</FormLabel>
                  <Input
                    required
                    type="phone"
                    {...register("phone")}
                    placeholder="(DDD) 90000-0000"
                  />
                  <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="birth_date" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>Data de nascimento</FormLabel>
                  <Input
                    required
                    {...register("birth_date")}
                    placeholder="Selecione a sua data de nascimento"
                    size="md"
                    type="date"
                  />
                  <FormErrorMessage>{errors.birth_date?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Descrição</FormLabel>
                  <Input
                    required={false}
                    type="text"
                    {...register("description")}
                    placeholder="Digitar descrição"
                  />
                  <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <VStack alignItems={"flex-start"} spacing={"10px"}>
                <Text>Informações de endereço</Text>
                <FormControl id="zip_code" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>CEP</FormLabel>
                  <Input
                    required
                    type="text"
                    {...register("address.zip_code")}
                    placeholder="00000.000"
                  />
                  <FormErrorMessage>{errors.address?.zip_code?.message}</FormErrorMessage>
                </FormControl>
                <HStack alignItems={"flex-start"}>
                  <FormControl id="state" isRequired isInvalid={errors ? true : false}>
                    <FormLabel>Estado</FormLabel>
                    <Input
                      required
                      type="text"
                      {...register("address.state")}
                      placeholder="Digitar estado"
                    />
                    <FormErrorMessage>{errors.address?.state?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="city" isRequired isInvalid={errors ? true : false}>
                    <FormLabel>Cidade</FormLabel>
                    <Input
                      required
                      type="text"
                      {...register("address.city")}
                      placeholder="Digitar cidade"
                    />
                    <FormErrorMessage>{errors.address?.city?.message}</FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl id="street" isRequired isInvalid={errors ? true : false}>
                  <FormLabel>Rua</FormLabel>
                  <Input
                    required
                    type="text"
                    {...register("address.street")}
                    placeholder="Digitar rua"
                  />
                  <FormErrorMessage>{errors.address?.street?.message}</FormErrorMessage>
                </FormControl>
                <HStack alignItems={"flex-start"}>
                  <FormControl
                    id="number"
                    isRequired={false}
                    isInvalid={errors.address?.number ? true : false}
                  >
                    <FormLabel>Número</FormLabel>
                    <Input
                      required
                      type="text"
                      {...register("address.number")}
                      placeholder="Digitar número"
                    />
                    <FormErrorMessage>{errors.address?.number?.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl id="complement" isRequired isInvalid={errors ? true : false}>
                    <FormLabel>Complemento</FormLabel>
                    <Input
                      required={false}
                      type="text"
                      {...register("address.complement")}
                      placeholder="Ex: apart 307"
                    />
                    <FormErrorMessage>{errors.address?.complement?.message}</FormErrorMessage>
                  </FormControl>
                </HStack>
              </VStack>
              <VStack w={"100%"} alignItems={"flex-start"} spacing={"10px"}>
                <Text>Tipo de conta</Text>
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
                <FormControl id="password" isInvalid={errors ? true : false}>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <Input
                      required
                      focusBorderColor="blue.300"
                      errorBorderColor="red.300"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />

                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="confirmPassword" isInvalid={errors ? true : false}>
                  <FormLabel>Confirmar senha</FormLabel>
                  <InputGroup>
                    <Input
                      required
                      focusBorderColor="blue.300"
                      errorBorderColor="red.300"
                      type={showPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <Button size={"lg"} type="submit" variant={"brand1"} alignSelf={"center"} w={"100%"}>
                Cadastrar
              </Button>
              {successModal === true ? <ModalSuccessRegister /> : null}
            </VStack>
          </form>
        </Center>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
