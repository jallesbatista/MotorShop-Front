import { Iquery } from "@/interfaces/poster.interfaces";
import { Flex, Heading, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

interface IInputFilterProps {
  children: React.ReactNode;
  query?: Iquery;
  filterName: "km" | "price";
}

const InputFilter = ({ children, query, filterName }: IInputFilterProps) => {
  const [priceMIN, setPriceMIN] = useState<string>(query?.priceMIN || "");
  const [priceMAX, setPriceMAX] = useState<string>(query?.priceMAX || "");
  const [kmMIN, setKmMIN] = useState<string>(query?.kmMIN || "");
  const [kmMAX, setKmMAX] = useState<string>(query?.kmMAX || "");

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
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (String(filterName).toLowerCase() == "km") {
                router.push(
                  `/${redirect()}${kmMIN ? `&kmMIN=${kmMIN}` : ""}${kmMAX ? `&kmMAX=${kmMAX}` : ""}`
                );
              } else {
                router.push(
                  `/${redirect()}${priceMIN ? `&priceMIN=${priceMIN}` : ""}${
                    priceMAX ? `&priceMAX=${priceMAX}` : ""
                  }`
                );
              }
            }}
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
            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (String(filterName).toLowerCase() == "km") {
                router.push(
                  `/${redirect()}${kmMIN ? `&kmMIN=${kmMIN}` : ""}${kmMAX ? `&kmMAX=${kmMAX}` : ""}`
                );
              } else {
                router.push(
                  `/${redirect()}${priceMIN ? `&priceMIN=${priceMIN}` : ""}${
                    priceMAX ? `&priceMAX=${priceMAX}` : ""
                  }`
                );
              }
            }}
          />
        </Flex>
      </Flex>
    </>
  );
};
export default InputFilter;
