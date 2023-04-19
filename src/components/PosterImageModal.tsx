import {
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Heading,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";

interface IPosterImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  posterImage: string;
}

const PosterImageModal = ({ isOpen, onClose, posterImage }: IPosterImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={"white"} color={"grey.1"} w={"90%"} maxW={"520px"}>
        <Flex
          gap={"48px"}
          p={{ base: "28px 16px", md: "18px 26px 28px 26px" }}
          direction={"column"}
        >
          <Flex justify={"space-between"}>
            <Heading fontWeight={"medium"} fontSize={"heading.7"}>
              Imagem do veículo
            </Heading>
            <ModalCloseButton color={"grey.4"} />
          </Flex>
          <Flex
            align={"center"}
            justify={"center"}
            overflow={"hidden"}
            w={"100%"}
            h={"240px"}
            rounded={"4px"}
            bg={"grey.7"}
          >
            <Image
              w={"auto"}
              maxW={"100%"}
              maxH={"100%"}
              objectFit={{ base: "contain", md: "contain" }}
              src={posterImage}
            />
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default PosterImageModal;
