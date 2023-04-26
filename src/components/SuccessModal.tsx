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
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

interface ModalSucessRegisterProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  redirect?: {
    redirectButton?: boolean;
    redirectTo: Url;
    buttonText: string;
  };
}

const SucessModal = ({
  isOpen,
  onClose,
  description,
  title,
  redirect,
}: ModalSucessRegisterProps) => {
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
              {title}
            </Heading>
            <Text fontSize={"body.1"} color={"grey.2"}>
              {description}
            </Text>

            {redirect?.redirectButton && (
              <Button size={"md"} as={Link} href={redirect?.redirectTo} variant={"brand1"}>
                {redirect.buttonText}
              </Button>
            )}
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SucessModal;
