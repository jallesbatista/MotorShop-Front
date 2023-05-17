import { posterContext } from "@/contexts/PosterContext";
import { IComment } from "@/interfaces/comment.interfaces";
import { IUserComment } from "@/interfaces/user.interfaces";
import { commentSchema } from "@/schemas";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Flex,
  Button,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ICommentEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  commentToEdit: IComment | null;
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const CommentEditModal = ({
  isOpen,
  onClose,
  commentToEdit,
  setCommentList,
}: ICommentEditModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IUserComment>({
    resolver: zodResolver(commentSchema),
  });
  const [editCommentLoading, setEditCommentLoading] = useState<boolean>(false);
  const { commentEdit } = posterContext();

  useEffect(() => {
    reset({
      content: commentToEdit?.content,
    });
  }, [isOpen]);

  const onSubmit = async (data: IUserComment) => {
    if (commentToEdit) {
      setEditCommentLoading(true);
      const commentUpdated = await commentEdit(commentToEdit.id, data);
      setEditCommentLoading(false);
      if (commentUpdated) {
        setCommentList((old) =>
          old.map((el) => {
            if (el.id == commentUpdated.id) {
              return commentUpdated;
            }
            return el;
          })
        );
      }
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <ModalOverlay />
      <ModalContent
        bg={"white"}
        color={"grey.1"}
        w={"90%"}
        maxW={"520px"}
        p={"18px 24px 32px 24px"}
      >
        <ModalCloseButton color={"grey.4"} />

        <Flex
          onSubmit={handleSubmit(onSubmit)}
          as="form"
          direction={"column"}
          align={"flex-start"}
          gap={"24px"}
          mt={"30px"}
        >
          <FormControl id="edit-comment" isInvalid={!!errors.content?.message}>
            <Textarea
              {...register("content")}
              minH={"128px"}
              placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
          <Flex direction={{ base: "column", sm: "row" }} w={"100%"} gap={"8px"} justify={"right"}>
            <Button
              onClick={() => {
                onClose();
                reset();
              }}
              w={{ base: "100%", sm: "auto" }}
              size={"lg"}
              variant={"negative"}
            >
              Cancelar
            </Button>
            <Button
              isLoading={editCommentLoading}
              loadingText="Salvando"
              type="submit"
              w={{ base: "100%", sm: "auto" }}
              size={"lg"}
              variant={"brand1"}
            >
              Salvar alterações
            </Button>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default CommentEditModal;
