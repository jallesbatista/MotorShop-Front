import { IPoster, TCreatePoster } from "@/interfaces/poster.interfaces";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { createContext, useContext } from "react";

interface IPosterProviderData {
  posterCreate: (data: TCreatePoster) => Promise<IPoster | undefined>;
}

const PosterContext = createContext<IPosterProviderData>({} as IPosterProviderData);

export const PosterProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const posterCreate = async (data: TCreatePoster) => {
    data.fipe_price = Number(Number(data.fipe_price).toFixed(2));
    data.kilometers = parseInt(String(data.kilometers));
    data.price = Number(Number(data.price).toFixed(2));

    try {
      const response = await api.post("/posters", data);

      toast({
        status: "warning",
        description: "Para ficar visível é necessário publicar :D",
        duration: 3000,
        position: "bottom-right",
        containerStyle: {
          color: "white",
        },
        isClosable: true,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast({
        status: "error",
        description: "Ops... Ocorreu um erro, tente novamente mais tarde",
        duration: 3000,
        position: "top-right",
        containerStyle: {
          color: "white",
        },
        isClosable: true,
      });
    }
  };
  return (
    <>
      <PosterContext.Provider
        value={{
          posterCreate,
        }}
      >
        {children}
      </PosterContext.Provider>
    </>
  );
};

export const posterContext = () => useContext(PosterContext);
