import {
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalCloseButton,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";

const DeleteModal = ({
  isOpen,
  onClose,
  deleteFunction,
}: {
  isOpen: boolean;
  onClose: () => void;
  deleteFunction: () => void;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"white"}
          color={"grey.1"}
          w={"90%"}
          maxW={"520px"}
          p={"18px 24px 42px 24px"}
        >
          <Heading mb={"58px"} fontSize={"heading.7"}>
            Excluir conta
          </Heading>

          <ModalCloseButton color={"grey.4"} />

          <Flex direction={"column"} align={"flex-start"} gap={"18px"}>
            <Heading mb={"20px"} fontSize={"heading.7"}>
              Tem certeza que deseja excluir sua conta?
            </Heading>
            <Text fontSize={"body.1"} color={"grey.2"}>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá
              seus dados de nossos servidores.
            </Text>

            <Flex
              direction={{ base: "column", sm: "row" }}
              w={"100%"}
              gap={"8px"}
              justify={"right"}
              mt={{ base: "24px" }}
            >
              <Button
                onClick={onClose}
                w={{ base: "100%", sm: "auto" }}
                size={"lg"}
                variant={"negative"}
              >
                Cancelar
              </Button>
              <Button
                onClick={deleteFunction}
                w={{ base: "100%", sm: "auto" }}
                size={"lg"}
                variant={"alert"}
              >
                Sim, excluir minha conta
              </Button>
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
