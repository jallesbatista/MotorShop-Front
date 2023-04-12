import { extendTheme } from "@chakra-ui/react"
import { defineStyleConfig } from '@chakra-ui/react'

const ProductCard = defineStyleConfig({
    baseStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px",
        gap: "16px",
        width: "312px",
        height: "350px",
        left: "20px",
        top: "20px",
    }
})

const ProductCardImage = defineStyleConfig({
    baseStyle: {
        position: "absolute",
        width: "312px",
        height: "152px",
        left:" 0px",
        top: "0px",
        bg: "grey.7",
    },
    variants: {
        default: {
            border: "2px solid grey.7",
        },
        hover: {
            border: "2px solid brand.1"
        }
    }
})

const ProductCardTitle = defineStyleConfig({
    baseStyle: {
        font: "Lexend",
        weight: 600,
        size: "16px",
        lineHeight: "20px",
        color: "grey.1",
    }
})

const ProductCardDesc = defineStyleConfig({
    baseStyle: {
        font: "Inter",
        weight: 400,
        size: "14px",
        lineHeight: "24px",
        color: "grey.2",
    }
})

const ProductCardAnunciante = defineStyleConfig({
    baseStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0px",
        gap: "8px",
        width: "108px",
        height: "32px",
    },
})

const ProductCardAnuncianteImg = defineStyleConfig({
    baseStyle: {
        width: "32px",
        height: "32px",
        borderRadius: "150px",
        bg: "brand.2",
    },
})

const ProductCardAnuncianteName = defineStyleConfig({
    baseStyle: {
        width: "68px",
        height: "24px",
        font: 'Inter',
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "24px",
        color: "grey.2",
    },
})

const ProductCardFooter = defineStyleConfig({
    baseStyle: {
        width: "309px",
        height: "32px",
    }
})

const ProductCardFooterKmAno = defineStyleConfig({
    baseStyle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: "0px",
        gap: "12px",
        width: "113px",
        height: "32px",
    }
})

const ProductCardFooterKmAnoOneBox = defineStyleConfig({
    baseStyle: {
        display: "flex",
        flexDirection: "row",
        justify: "center",
        alignItems:" center",
        padding: "4px 8px",
        gap: "10px",
        width: "51px",
        height: "32px",
        bg: "brand.4",
        borderRadius: "4px",
        color: "brand.1",
    },
})

const ProductCardFooterPrice = defineStyleConfig({
    baseStyle: {
        width: "105px",
        height: "20px",
        font: 'Lexend',
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "20px",
        color: "grey.1",
    }
})

const Modal = defineStyleConfig({
    baseStyle: {
        header: {
            display: "flex",
            flexDirection: "row",
            justify: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            gap: "302px",
        },
        body: {
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            gap: "302px",
        }
    },
})

const Footer = defineStyleConfig({
    baseStyle: {
        display: "flex",
        flexDirection: "row",
        justify: "space-between",
        alignItems: "center",
        padding: "45px 59px",
        gap: "10px",
        position: "absolute",
        width: "1600px",
        height: "140px",
        bg: "grey.0",
    },
})

const Inputs = defineStyleConfig({
    baseStyle: {
        borderRadius: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    sizes: {
        medium: {
            padding: "0px 16px",
            width: "315px",
            height: "48px",
        },
        big: {
            padding: "24px 16px",
            width: "315px",
            height: "80px",
        },
    },
    variants: {
        default: {
            color: "grey.3",
            border: "1.5px solid grey.7",
        },
        hover: {
            bg: "grey.8",
            color: "grey.3",
            border: "1.5px solid grey.8",
        },
        focus: {
            bg: "grey.9",
            color: "grey.0",
            border: "1.5px solid brand.2",
        },
    },
})

const Buttons = defineStyleConfig({
    baseStyle: {
        display: "flex",
        flexDirection: "row",
        justify: "center",
        alignItems: "center",
        borderRadius: "4px",
    },
    sizes: {
        big: {
            padding: "12px 20px",
            width: "146px",
            height: "48px",
        },
        medium: {
            width: "119px",
            height: "38px",
            padding: "12px 28px",
        },
    },
    variants: {
        grey1: {
            default: {
                bg: "grey.0",
                color: "white.1",
                border: "1.5px solid grey.0",
            },
            hover: {
                bg: "grey.1",
                color: "white.1",
                border: "1.5px solid grey.11",
            }
        },
        negative: {
            default: {
                bg: "grey.6",
                color: "grey.2",
                border: "1.5px solid grey.6",
            },
            hover: {
                bg: "grey.5",
                color: "grey.2",
                border: "1.5px solid grey.5",
            }
        },
        disable: {
            bg: "grey.5",
            color: "white.1",
            border: "1.5px solid grey.5",
        },
        brand1: {
            default: {
                bg: "brand.1",
                color: "white.1",
                border: "1.5px solid brand.1",
            },
            hover: {
                bg: "brand.2",
                color: "white.1",
                border: "1.5px solid brand.2",
            }
        },
        brandOpacity: {
            bg: "brand.4",
            color: "brand.1",
            border: "1.5px solid brand.4",
        },
        light: {
            bg: "grey.10",
            color: "grey.1",
            border: "1.5px solid grey.10",
        },
        outlineLight: {
            default: {
                color: "grey.10",
                border: "1.5px solid grey.10",
            },
            hover: {
                bg: "grey.10",
                color: "grey.1",
                border: "1.5px solid grey.10",
            }
        },
        outline1: {
            default: {
                color: "grey.0",
                border: "1.5px solid grey.0",
            },
            hover: {
                bg: "grey.1",
                color: "grey.10",
                border: "1.5px solid grey.1",
            }
        },
        outline2: {
            default: {
                color: "grey.0",
                border: "1.5px solid grey.4",
            },
            hover: {
                bg: "grey.1",
                color: "grey.10",
                border: "1.5px solid grey.1",
            }
        },
        outlineBrand1: {
            default: {
                color: "brand.1",
                border: "1.5px solid brand.1",
            },
            hover: {
                bg: "brand.4",
                color: "brand.1",
                border: "1.5px solid brand.1",
            }
        },
        link: {
            default: {
                color: "grey.0",
            },
            hover: {
                bg: "grey.8",
                color: "grey.0",
                border: "1.5px solid grey.8",
            }
        },
        alert: {
            default: {
                bg: "alert.3",
                color: "alert.1",
                border: "1.5px solid alert.3",
            },
            hover: {
                bg: "alert.2",
                color: "alert.1",
                border: "1.5px solid alert.2",
            }
        },
        sucess: {
            default: {
                bg: "sucess.3",
                color: "sucess.1",
                border: "1.5px solid sucess.3",
            },
            hover: {
                bg: "sucess.2",
                color: "sucess.1",
                border: "1.5px solid sucess.2",
            }
        },
        brandDisable: {
            bg: "brand.3",
            color: "brand.4",
            border: "1.5px solid brand.3",
        }
    }
})

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
            1: "#ffffff"
        },
        feedback: {
            sucess: {
                1: "#18794E",
                2: "#CCEBD7",
                3: "#DDF3E4",
            },
            alert: {
                1: "#CD2B31",
                2: "#FDD8D8",
                3: "#FFE5E5",
            }
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
        }
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
        heading: "Lexend",
        body: "Inter",
    },

    fontSize: {
        heading: {
            1: "44px",
            2: "36px",
            3: "32px",
            4: "28px",
            5: "24px",
            6: "20px", 
            7: "16px",
        },
        body: {
            1: "16px",
            2: "14px", 
        },
        button: {
            big: "16px",
            medium: "14px",
        },
        input: {
            placeholder: "14px",
            label: "14px",
        }
    },

    lineHeight: {
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
        }
    },

    components: {
        Buttons,
        Inputs,
        Footer,
        Modal,
        ProductCard,
        ProductCardImage,
        ProductCardTitle,
        ProductCardDesc,
        ProductCardAnunciante,
        ProductCardAnuncianteImg,
        ProductCardAnuncianteName,
        ProductCardFooter,
        ProductCardFooterKmAno,
        ProductCardFooterKmAnoOneBox,
        ProductCardFooterPrice
    }
})

export default customTheme