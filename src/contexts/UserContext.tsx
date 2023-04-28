import { IUserCreate, TUserUpdate } from "@/interfaces/user.interfaces";
import { createContext, useContext } from "react";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { authContext } from "./AuthContext";
import { destroyCookie } from "nookies";

interface IUserProviderData {
  userCreate: (data: IUserCreate) => Promise<true | undefined>;
  userUpdate: (data: TUserUpdate) => Promise<void>;
  userDelete: () => Promise<void>;
}

export const UserContext = createContext<IUserProviderData>({} as IUserProviderData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const router = useRouter();

  const { user, setUser } = authContext();

  const userCreate = async (data: IUserCreate) => {
    try {
      await api.post("/users", data);
      return true;
    } catch (error: any) {
      console.error(error);
      toast({
        status: "error",
        description:
          error.response?.data.message || "Ops, ocorreu um erro. Tente novamente mais tarde",
        duration: 3000,
        position: "bottom-right",
        containerStyle: {
          color: "white",
        },
        isClosable: true,
      });
    }
  };

  const userUpdate = async (data: TUserUpdate) => {
    try {
      const response = await api.patch(`/users/${user!.id}`, data);
      setUser(response.data);
      toast({
        position: "bottom-right",
        title: "Dados alterados com sucesso",
        containerStyle: {
          color: "white",
        },
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        position: "bottom-right",
        title: "Ops... Ocorreu algo de errado! Tente novamente mais tarde",
        containerStyle: {
          color: "white",
        },
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const userDelete = async () => {
    try {
      await api.delete(`users/${user!.id}`);
      toast({
        position: "bottom-right",
        title: "Conta excluída com sucesso",
        containerStyle: {
          color: "white",
        },
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      destroyCookie(null, "ecommerce.token");
      setUser(null);
      router.push("/login");
    } catch (err: any) {
      console.log(err);
      toast({
        position: "bottom-right",
        title: "Ops... Ocorreu algo de errado! Tente novamente mais tarde",
        containerStyle: {
          color: "white",
        },
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <UserContext.Provider value={{ userCreate, userUpdate, userDelete }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const userContext = () => useContext(UserContext);
