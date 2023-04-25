import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

interface ModalSucessRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSuccessRegister = ({ isOpen, onClose }: ModalSucessRegisterProps) => {
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
            Sucesso!
          </Heading>

          <ModalCloseButton color={"grey.4"} />

          <Flex direction={"column"} align={"flex-start"} gap={"18px"}>
            <Heading mb={"20px"} fontSize={"heading.7"}>
              Sua conta foi criada com sucesso!
            </Heading>
            <Text fontSize={"body.1"} color={"grey.2"}>
              Agora você poderá ver seus negócios crescendo em grande escala
            </Text>

            <Button size={"md"} as={Link} href={"/login"} variant={"brand1"}>
              Ir para o login
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSuccessRegister;
