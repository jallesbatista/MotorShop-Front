import { authContext } from "@/contexts/AuthContext";
import { userContext } from "@/contexts/UserContext";
import { CEPMask } from "@/functions/masks";
import { TUpdateUserAddress } from "@/interfaces/user.interfaces";
import { updateAdressSchema } from "@/schemas";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  Flex,
  Button,
  Text,
  ModalCloseButton,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddressEditModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { userUpdate } = userContext();
  const { user } = authContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdateUserAddress>({
    resolver: zodResolver(updateAdressSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        address: {
          zip_code: user.address.zip_code.replace(/(\d{5})(\d{3})/, "$1-$2"),
          state: user.address.state,
          city: user.address.city,
          street: user.address.street,
          number: user.address.number,
          complement: user.address.complement,
        },
      });
    }
  }, [, user]);

  const onSubmit = (data: TUpdateUserAddress) => {
    userUpdate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          maxW={"520px"}
          w={"90%"}
          p={{ base: "18px 16px 32px 16px", sm: "18px 24px 36px 24px" }}
          bg={"white"}
          rounded={"4px"}
          fontWeight={"semibold"}
          color={"grey.1"}
        >
          <Heading mb={"32px"} fontSize={"heading.7"}>
            Editar endereço
          </Heading>
          <ModalCloseButton color={"grey.4"} />
          <VStack
            alignItems={"flex-start"}
            spacing={{ base: "36px", sm: "24px" }}
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
          >
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
            <Flex w={"100%"} gap={"8px"} justify={"right"} pt={{ sm: "12px" }}>
              <Button
                onClick={onClose}
                w={{ base: "40%", sm: "auto" }}
                size={"lg"}
                variant={"negative"}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                w={{ base: "80%", sm: "auto" }}
                size={"lg"}
                variant={"brandDisable"}
              >
                Salvar Alterações
              </Button>
            </Flex>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressEditModal;
