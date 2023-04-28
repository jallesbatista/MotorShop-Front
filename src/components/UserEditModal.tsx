import { authContext } from "@/contexts/AuthContext";
import { userContext } from "@/contexts/UserContext";
import { CPFMask, PhoneMask } from "@/functions/masks";
import { TUserUpdate } from "@/interfaces/user.interfaces";
import { updateUserSchema } from "@/schemas";
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
  Textarea,
  Flex,
  Button,
  Text,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DeleteModal from "./DeleteModal";

const UserEditModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { userUpdate, userDelete } = userContext();
  const { user } = authContext();

  const {
    isOpen: isConfirmDeleteOpen,
    onOpen: onConfirmDeleteOpen,
    onClose: onConfirmDeleteClose,
  } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserUpdate>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        cpf: user.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
        phone: user.phone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
        birth_date: user.birth_date,
        description: user.description!,
      });
    }
  }, [, user]);

  const onSubmit = (data: TUserUpdate) => {
    userUpdate(data);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          maxW={"520px"}
          w={"90%"}
          p={{ base: "18px 16px 32px 16px", sm: "18px 24px 32px 24px" }}
          bg={"white"}
          rounded={"4px"}
          fontWeight={"semibold"}
          color={"grey.1"}
        >
          <Heading mb={"32px"} fontSize={"heading.7"}>
            Editar perfil
          </Heading>
          <ModalCloseButton color={"grey.4"} />
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
              <Input type="text" {...register("name")} placeholder="Ex: Samuel leão" />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={!!errors.email?.message}>
              <FormLabel fontWeight={"semibold"} fontSize={"body.2"}>
                Email
              </FormLabel>
              <Input type="email" {...register("email")} placeholder="Ex: samuel@kenzie.com.br" />
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
            <Flex direction={{ base: "column", sm: "row-reverse" }} w={"100%"} gap={"8px"}>
              <Button
                minW={"min-content"}
                size={"lg"}
                px={{ base: "4px", md: "auto" }}
                variant={"brand1"}
                w={{ base: "100%", sm: "50%" }}
                type="submit"
              >
                Salvar alterações
              </Button>

              <Flex gap={"8px"}>
                <Button
                  minW={"max-content"}
                  w={{ sm: "50%" }}
                  size={"lg"}
                  variant={"alert"}
                  onClick={onConfirmDeleteOpen}
                >
                  Excluir Perfil
                </Button>
                <Button
                  size={"lg"}
                  variant={"negative"}
                  w={{ base: "100%", sm: "50%" }}
                  minW={"max-content"}
                  onClick={onClose}
                >
                  Cancelar
                </Button>
              </Flex>
            </Flex>
          </VStack>
        </ModalContent>
      </Modal>

      <DeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={onConfirmDeleteClose}
        deleteFunction={userDelete}
      />
    </>
  );
};

export default UserEditModal;
