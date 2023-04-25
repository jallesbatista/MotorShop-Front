import { Box, useRadio } from "@chakra-ui/react";

const CustomRadioButton = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w={"50%"}>
      <input {...input} />
      <Box
        fontSize={"button.lg"}
        {...checkbox}
        cursor="pointer"
        border={"2px solid"}
        borderColor={"grey.4"}
        textAlign={"center"}
        color={"black"}
        fontWeight={"semibold"}
        rounded={"4px"}
        _checked={{
          bg: "brand.1",
          color: "white.1",
          borderColor: "transparent",
        }}
        px={"8px"}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default CustomRadioButton;
