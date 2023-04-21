import { Box, useRadio } from "@chakra-ui/react";

const CustomRadioButton = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w={"50%"}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        borderColor={"grey.1"}
        textAlign={"center"}
        _checked={{
          bg: "brand.1",
          color: "white.1",
          borderColor: "brand.1",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default CustomRadioButton;
