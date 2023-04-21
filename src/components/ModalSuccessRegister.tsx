import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";

const ModalSuccessRegister = ({}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"brand.4"}>
          <ModalHeader fontSize={"2xl"}>Sucesso!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading mb={"20px"} fontSize={"2xl"}>
              Sua conta foi criada com sucesso!
            </Heading>
            <Text>Agora você poderá ver seus negócios creancedo em grande escala</Text>
          </ModalBody>
          <ModalFooter flexDirection={"row-reverse"}>
            <Button
              as={Link}
              href={"/login"}
              mb={"25px"}
              variant={"brand1"}
              alignSelf={"flex-start"}
            >
              Ir para o login
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSuccessRegister;
