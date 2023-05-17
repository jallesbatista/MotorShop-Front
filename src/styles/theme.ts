import { extendTheme } from "@chakra-ui/react";
import { defineStyleConfig } from "@chakra-ui/react";
import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const zIndices = {
  zIndices: {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 99999,
  },
};

const inputTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: "default",
  },
  baseStyle: {
    field: {
      width: "100%",
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    default: {
      field: {
        height: "48px",
        bg: "transparent",
        border: "2px solid",
        borderColor: "grey.8",
        borderRadius: "4px",
        fontSize: "input.md",
        color: "grey.1",
        _placeholder: {
          color: "grey.3",
        },
        _hover: {
          bg: "grey.8",
          borderColor: "transparent",
        },
        _focus: {
          bg: "grey.9",
          border: "2px solid",
          borderColor: "brand.2",
          _placeholder: {
            color: "transparent",
          },
        },
        _invalid: {
          border: "2px solid",
          borderColor: "red",
        },
      },
    },
    file: {
      field: {
        height: "48px",
        bg: "transparent",
        border: "2px solid",
        borderColor: "grey.8",
        borderRadius: "4px",
        fontSize: "input.md",
        color: "grey.1",
        cursor: "pointer",
        paddingLeft: "0",
        _placeholder: {
          color: "grey.3",
        },
        "::-webkit-file-upload-button": {
          transition: ".3s",
          appearance: "none",
          border: "none",
          color: "brand.1",
          bg: "white",
          h: "100%",
          borderRight: "2px solid",
          borderColor: "brand.1",
          fontWeight: "semibold",
          cursor: "pointer",
          rounded: "0px 4px 4px 0px",
          marginRight: "12px",
        },
        _hover: {
          bg: "grey.8",
          borderColor: "transparent",
          "::-webkit-file-upload-button": {
            color: "white",
            bg: "brand.3",
            borderColor: "transparent",
          },
        },
        _focus: {
          bg: "grey.9",
          "::-webkit-file-upload-button": {
            color: "white",
            bg: "brand.3",
            borderColor: "transparent",
          },
        },
        _invalid: {
          border: "2px solid",
          borderColor: "red",
          "::-webkit-file-upload-button": {
            borderColor: "red",
            color: "red",
          },
          _hover: {
            "::-webkit-file-upload-button": {
              borderColor: "transparent",
              color: "white",
              colorScheme: "red",
            },
          },
          _focus: {
            "::-webkit-file-upload-button": {
              borderColor: "transparent",
              color: "white",
              colorScheme: "red",
            },
          },
        },
      },
    },
  },
});

const textAreaTheme = defineStyleConfig({
  defaultProps: {
    size: "md",
    variant: "default",
  },
  variants: {
    default: {
      border: "2px solid",
      borderColor: "grey.8",
      rounded: "4px",
      color: "grey.2",
      resize: "none",
      maxHeight: "80px",
      overflowY: "scroll",
      _placeholder: {
        color: "grey.3",
      },
      _hover: {
        bg: "grey.8",
        borderColor: "transparent",
      },
      _focus: {
        bg: "grey.9",
        border: "2px solid",
        borderColor: "brand.2",
        _placeholder: {
          color: "transparent",
        },
      },
      _invalid: {
        border: "2px solid",
        borderColor: "red",
      },
      "::-webkit-scrollbar": {
        width: "6px",
      },
      "::-webkit-scrollbar-track": {
        width: "2px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "brand.3",
        borderRadius: "24px",
      },
    },
  },
});

const buttonTheme = defineStyleConfig({
  defaultProps: {
    size: "md",
    variant: "grey1",
  },
  baseStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    fontWeight: "semibold",
  },
  sizes: {
    lg: {
      fontSize: "button.lg",
      px: "15px",
      height: "48px",
    },
    md: {
      fontSize: "button.md",
      px: "20px",
      height: "38px",
    },
  },
  variants: {
    grey1: {
      bg: "grey.0",
      color: "white.1",
      _hover: {
        bg: "grey.1",
        color: "white.1",
      },
    },
    negative: {
      bg: "grey.6",
      color: "grey.2",
      _hover: {
        bg: "grey.5",
      },
    },
    disable: {
      bg: "grey.5",
      color: "white.1",
    },
    brand1: {
      bg: "brand.1",
      color: "white.1",
      _hover: {
        bg: "brand.2",
        _loading: {
          bg: "brand.2",
        },
      },
    },
    brandOpacity: {
      bg: "brand.4",
      color: "brand.1",
      _hover: {
        _loading: {
          bg: "brand.4",
        },
      },
    },
    light: {
      bg: "grey.10",
      color: "grey.1",
    },
    outlineLight: {
      bg: "transparent",
      color: "grey.10",
      border: "2px solid",
      borderColor: "grey.10",
      _hover: {
        bg: "grey.10",
        color: "grey.1",
      },
    },
    outline1: {
      bg: "transparent",
      color: "grey.0",
      border: "2px solid",
      borderColor: "grey.0",
      _hover: {
        bg: "grey.1",
        color: "grey.10",
        borderColor: "transparent",
      },
    },
    outline2: {
      color: "grey.0",
      border: "2px solid",
      borderColor: "grey.4",
      _hover: {
        bg: "grey.1",
        color: "grey.10",
        borderColor: "transparent",
      },
    },
    outlineBrand1: {
      color: "brand.1",
      border: "2px solid",
      borderColor: "brand.1",
      _hover: {
        bg: "brand.4",
      },
    },
    btnLink: {
      color: "grey.0",
      textDecoration: "none",
      _hover: {
        bg: "grey.8",
      },
    },
    alert: {
      bg: "alert.3",
      color: "alert.1",
      _hover: {
        bg: "alert.2",
      },
    },
    sucess: {
      bg: "sucess.3",
      color: "sucess.1",
      _hover: {
        bg: "sucess.2",
      },
    },
    brandDisable: {
      bg: "brand.3",
      color: "brand.4",
      _hover: {
        _loading: {
          bg: "brand.3",
        },
      },
    },
  },
});

const customTheme = extendTheme({
  colors: {
    brand: {
      1: "#4529E6",
      2: "#5126EA",
      3: "#B0A6F0",
      4: "#EDEAFD",
    },
    grey: {
      0: "#0B0D0D",
      1: "#212529",
      2: "#495057",
      3: "#868E96",
      4: "#ADB5BD",
      5: "#CED4DA",
      6: "#DEE2E6",
      7: "#E9ECEF",
      8: "#F1F3F5",
      9: "#F8F9FA",
      10: "#FDFDFD",
    },
    white: {
      1: "#ffffff",
    },
    sucess: {
      1: "#18794E",
      2: "#CCEBD7",
      3: "#DDF3E4",
    },
    alert: {
      1: "#CD2B31",
      2: "#FDD8D8",
      3: "#FFE5E5",
    },
    randomProfile: {
      1: "#E34D8C",
      2: "#C04277",
      3: "#7D2A4D",
      4: "#7000FF",
      5: "#6200E3",
      6: "#36007D",
      7: "#349974",
      8: "#2A7D5F",
      9: "#153D2E",
      10: "#6100ff",
      11: "#5700E3",
      12: "#30007D",
    },
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  fonts: {
    heading: `"Lexend"`,
    body: `"Inter"`,
  },

  fontSizes: {
    heading: {
      1: "44px",
      2: "36px",
      3: "32px",
      4: "28px",
      5: "24px",
      6: "20px",
      7: "16px",
      8: "14px",
    },
    body: {
      1: "16px",
      2: "14px",
      3: "12px",
    },
    button: {
      lg: "16px",
      md: "14px",
    },
    input: {
      md: "16px",
      label: "14px",
    },
  },

  lineHeights: {
    heading: {
      1: "56px",
      2: "45px",
      3: "40px",
      4: "35px",
      5: "30px",
      6: "25px",
      7: "20px",
    },
    body: {
      1: "28px",
      2: "24px",
    },
    button: {
      big: "0px",
      medium: "0px",
    },
    input: {
      placeholder: "0px",
      label: "17px",
    },
  },

  components: {
    Button: buttonTheme,
    Input: inputTheme,
    zIndices,
    Textarea: textAreaTheme,
  },
});

export default customTheme;
