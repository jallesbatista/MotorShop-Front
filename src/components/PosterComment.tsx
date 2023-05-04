import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import "moment/locale/pt-br";

interface IPosterCommentProps {
  username: string;
  content: string;
  createdAt: string;
}

const PosterComment = ({ username, content, createdAt }: IPosterCommentProps) => {
  return (
    <Flex alignItems={"center"} gap={"8px"} flexWrap={"wrap"}>
      <Avatar
        name={username}
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
        {username}
      </Heading>
      <Text as={"span"} lineHeight={"body.2"} fontSize={"body.3"} color={"grey.4"}>
        •
      </Text>
      <Text lineHeight={"body.2"} fontSize={"body.3"} color={"grey.3"}>
        {moment(createdAt).fromNow()}
      </Text>
      <Text
        fontWeight={"normal"}
        lineHeight={"body.2"}
        fontSize={"body.2"}
        w={"100%"}
        color={"grey.2"}
      >
        {content}
      </Text>
    </Flex>
  );
};

export default PosterComment;
