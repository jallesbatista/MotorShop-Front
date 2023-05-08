import { Iquery } from "@/interfaces/poster.interfaces";
import { Flex, Heading, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface IInputFilterProps {
  children: React.ReactNode;
  query?: Iquery;
  filterName: "km" | "price";
  priceMIN: string;
  setPriceMIN: React.Dispatch<React.SetStateAction<string>>;
  priceMAX: string;
  setPriceMAX: React.Dispatch<React.SetStateAction<string>>;
  kmMIN: string;
  setKmMIN: React.Dispatch<React.SetStateAction<string>>;
  kmMAX: string;
  setKmMAX: React.Dispatch<React.SetStateAction<string>>;
}

const InputFilter = ({
  children,
  query,
  filterName,
  kmMIN,
  setKmMIN,
  kmMAX,
  setKmMAX,
  priceMIN,
  setPriceMIN,
  priceMAX,
  setPriceMAX,
}: IInputFilterProps) => {
  const router = useRouter();

  const redirect = () => {
    let redirectLink = "?";

    if (query) {
      Object.entries(query).forEach(([key, value], index) => {
        if (filterName == "price") {
          if (key !== "priceMIN" && key !== "priceMAX") {
            redirectLink += `&${key}=${value}`;
          }
        } else {
          if (key !== "kmMIN" && key !== "kmMAX") {
            redirectLink += `&${key}=${value}`;
          }
        }
      });
    }

    return redirectLink;
  };

  const KmMinPriceMinSearch = () => {
    if (String(filterName).toLowerCase() == "km") {
      router.push(
        `/${redirect()}${kmMIN ? `&kmMIN=${kmMIN}` : ""}${kmMAX ? `&kmMAX=${kmMAX}` : ""}`,
        "",
        {
          scroll: false,
        }
      );
    } else {
      router.push(
        `/${redirect()}${priceMIN ? `&priceMIN=${priceMIN}` : ""}${
          priceMAX ? `&priceMAX=${priceMAX}` : ""
        }`,
        "",
        {
          scroll: false,
        }
      );
    }
  };

  const KmMaxPriceMaxSearch = () => {
    if (String(filterName).toLowerCase() == "km") {
      router.push(
        `/${redirect()}${kmMIN ? `&kmMIN=${kmMIN}` : ""}${kmMAX ? `&kmMAX=${kmMAX}` : ""}`,
        "",
        {
          scroll: false,
        }
      );
    } else {
      router.push(
        `/${redirect()}${priceMIN ? `&priceMIN=${priceMIN}` : ""}${
          priceMAX ? `&priceMAX=${priceMAX}` : ""
        }`,
        "",
        {
          scroll: false,
        }
      );
    }
  };

  return (
    <>
      <Flex direction={"column"}>
        <Heading fontSize={"heading.4"} fontWeight={"semibold"}>
          {children}
        </Heading>

        <Flex gap={"20px"} paddingLeft={"8px"} py={"28px"}>
          <Input
            type="text"
            fontFamily={"Lexend"}
            w={"50%"}
            textAlign={"center"}
            bg={"grey.5"}
            placeholder="Mínimo"
            value={String(filterName).toLowerCase() == "km" ? kmMIN : priceMIN}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value;
              value = value.replace(/\D/g, "");
              e.target.value = value;
              if (String(filterName).toLowerCase() == "km") {
                setKmMIN(e.target.value);
              } else {
                setPriceMIN(e.target.value);
              }
              return e;
            }}
            onBlur={KmMinPriceMinSearch}
          />
          <Input
            type="text"
            fontFamily={"Lexend"}
            w={"50%"}
            textAlign={"center"}
            bg={"grey.5"}
            placeholder="Máximo"
            value={String(filterName).toLowerCase() == "km" ? kmMAX : priceMAX}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              let value = e.target.value;
              value = value.replace(/\D/g, "");
              e.target.value = value;
              if (String(filterName).toLowerCase() == "km") {
                setKmMAX(e.target.value);
              } else {
                setPriceMAX(e.target.value);
              }
              return e;
            }}
            onBlur={KmMaxPriceMaxSearch}
          />
        </Flex>
      </Flex>
    </>
  );
};
export default InputFilter;
