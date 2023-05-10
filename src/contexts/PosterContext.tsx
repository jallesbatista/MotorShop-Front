import { IComment } from "@/interfaces/comment.interfaces";
import { IPoster, TCreatePoster, TEditPoster } from "@/interfaces/poster.interfaces";
import { IUserComment } from "@/interfaces/user.interfaces";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { createContext, useContext } from "react";

interface IPosterProviderData {
  posterCreate: (data: TCreatePoster) => Promise<IPoster | undefined>;
  posterEdit: (id: string, data: TEditPoster) => Promise<IPoster | undefined>;
  posterDelete: (id: string) => Promise<true | undefined>;
  commentGet: (id: string) => Promise<IComment[] | undefined>;
  commentCreate: (id: string, data: IUserComment) => Promise<IComment | undefined>;
}

const PosterContext = createContext<IPosterProviderData>({} as IPosterProviderData);

export const PosterProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const posterCreate = async (data: TCreatePoster): Promise<any> => {
    data.fipe_price = Number(Number(data.fipe_price).toFixed(2));
    data.kilometers = parseInt(String(data.kilometers));
    data.price = Number(Number(data.price).toFixed(2));

    const formData = new FormData();

    const imageArray = data.images;

    imageArray.forEach((image) => {
      console.log(image);
      formData.append("image", image.image!);
    });
    // formData.append("image", imageArray[0].image!, imageArray[0].image!.name);
    // console.log()
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // try {
    //   const response = await api.post("/posters", data, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });

    //   toast({
    //     status: "warning",
    //     description: "Para ficar visível é necessário publicar :D",
    //     duration: 3000,
    //     position: "bottom-right",
    //     containerStyle: {
    //       color: "white",
    //     },
    //     isClosable: true,
    //   });
    //   return response.data;
    // } catch (error: any) {
    //   console.log(error);
    //   toast({
    //     status: "error",
    //     description:
    //       error.response?.data.message ||
    //       "Ops... Ocorreu algo de errado! Tente novamente mais tarde",
    //     duration: 3000,
    //     position: "top-right",
    //     containerStyle: {
    //       color: "white",
    //     },
    //     isClosable: true,
    //   });
    // }
  };

  const posterEdit = async (id: string, data: TEditPoster): Promise<IPoster | undefined> => {
    data.fipe_price = Number(Number(data.fipe_price).toFixed(2));
    data.kilometers = parseInt(String(data.kilometers));
    data.price = Number(Number(data.price).toFixed(2));

    try {
      const response = await api.patch(`/posters/${id}`, data);
      toast({
        status: "success",
        title: "Anúncio atualizado com sucesso",
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
        description:
          error.response?.data.message ||
          "Ops... Ocorreu algo de errado! Tente novamente mais tarde",
        duration: 3000,
        position: "top-right",
        containerStyle: {
          color: "white",
        },
        isClosable: true,
      });
    }
  };

  const posterDelete = async (id: string): Promise<true | undefined> => {
    try {
      await api.delete(`/posters/${id}`);
      return true;
    } catch (error: any) {
      console.log(error);
      toast({
        status: "error",
        description: "Ops... Ocorreu algo de errado! Tente novamente mais tarde",
        duration: 3000,
        position: "top-right",
        containerStyle: {
          color: "white",
        },
        isClosable: true,
      });
    }
  };

  const commentGet = async (id: string): Promise<IComment[] | undefined> => {
    try {
      const response = await api.get(`/posters/${id}/comments`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (!toast.isActive("commentGet")) {
        toast({
          status: "error",
          description: "Ops... Ocorreu um erro ao carregar os comentários.",
          duration: 3000,
          position: "top-right",
          containerStyle: {
            color: "white",
          },
          isClosable: true,
          id: "commentGet",
        });
      }
    }
  };

  const commentCreate = async (id: string, data: IUserComment): Promise<IComment | undefined> => {
    try {
      const response = await api.post(`/posters/${id}/comments`, data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast({
        status: "error",
        description: "Ops... Ocorreu um erro ao fazer o comentário.",
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
          posterEdit,
          posterDelete,
          commentGet,
          commentCreate,
        }}
      >
        {children}
      </PosterContext.Provider>
    </>
  );
};

export const posterContext = () => useContext(PosterContext);
