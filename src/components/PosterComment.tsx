import { authContext } from "@/contexts/AuthContext";
import { Avatar, Flex, Heading, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import DeleteModal from "./DeleteModal";
import CommentEditModal from "./CommentEditModal";
import { IComment } from "@/interfaces/comment.interfaces";
import { posterContext } from "@/contexts/PosterContext";

interface IPosterCommentProps {
  commentInfo: IComment;
  setCommentList: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const PosterComment = ({ commentInfo, setCommentList }: IPosterCommentProps) => {
  const { user } = authContext();
  const { commentDelete } = posterContext();

  const [commentToEditDelete, setCommentToEditDelete] = useState<IComment | null>(null);

  const {
    isOpen: isEditCommentModalOpen,
    onOpen: onEditCommentModalOpen,
    onClose: onEditCommentModalClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteCommentModalOpen,
    onOpen: onDeleteCommentModalOpen,
    onClose: onDeleteCommentModalClose,
  } = useDisclosure();

  const deleteCommentFunction = async () => {
    if (commentToEditDelete) {
      const deleted = await commentDelete(commentToEditDelete.id);
      if (deleted) {
        setCommentList((old) => old.filter((el) => el.id !== commentToEditDelete.id));
        onDeleteCommentModalClose();
        setCommentToEditDelete(null);
      }
    }
  };

  return (
    <>
      {" "}
      <Flex alignItems={"center"} gap={"8px"} flexWrap={"wrap"}>
        <Avatar
          name={commentInfo.user.name}
          w={"32px"}
          h={"32px"}
          sx={{
            div: {
              fontSize: "heading.8",
              fontWeight: "medium",
            },
          }}
        />
        <Heading
          lineHeight={"heading.6"}
          fontWeight={"semibold"}
          fontSize={"heading.8"}
          as={"h3"}
          color={"grey.1"}
        >
          {commentInfo.user.name}
        </Heading>
        <Text as={"span"} lineHeight={"body.2"} fontSize={"body.3"} color={"grey.4"}>
          •
        </Text>
        <Text lineHeight={"body.2"} fontSize={"body.3"} color={"grey.3"}>
          {moment(commentInfo.createdAt).fromNow()}
        </Text>
        <Text
          fontWeight={"normal"}
          lineHeight={"body.2"}
          fontSize={"body.2"}
          w={"100%"}
          color={"grey.2"}
        >
          {commentInfo.content}
        </Text>
        {user && commentInfo.user.id == user.id && (
          <>
            <Flex align={"center"} justify={"right"} w={"100%"} gap={"8px"}>
              <IconButton
                p={0}
                _hover={{
                  bg: "grey.7",
                }}
                fontSize={"24px"}
                color={"brand.1"}
                maxW={"100%"}
                minW={"0px"}
                w={"24px"}
                h={"24px"}
                bg={"transparent"}
                aria-label="editar"
                icon={<HiPencilAlt />}
                onClick={() => {
                  onEditCommentModalOpen();
                  setCommentToEditDelete(commentInfo);
                }}
              />
              <IconButton
                p={0}
                _hover={{
                  bg: "alert.3",
                }}
                fontSize={"24px"}
                color={"red"}
                maxW={"100%"}
                minW={"0px"}
                w={"24px"}
                h={"24px"}
                bg={"transparent"}
                aria-label="editar"
                icon={<HiOutlineTrash />}
                onClick={() => {
                  onDeleteCommentModalOpen();
                  setCommentToEditDelete(commentInfo);
                }}
              />
            </Flex>
          </>
        )}
      </Flex>
      <DeleteModal
        isOpen={isDeleteCommentModalOpen}
        onClose={onDeleteCommentModalClose}
        headingText="Excluir comentário"
        title="Tem certeza que deseja excluir esse comentário?"
        description="Essa ação irá remover permanentemente seu comentário desse anúncio"
        deleteFunction={deleteCommentFunction}
      />
      <CommentEditModal
        commentToEdit={commentToEditDelete}
        isOpen={isEditCommentModalOpen}
        onClose={() => {
          onEditCommentModalClose();
          setCommentToEditDelete(null);
        }}
        setCommentList={setCommentList}
      />
    </>
  );
};

export default PosterComment;
