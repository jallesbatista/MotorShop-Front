import { IUserCreate } from "@/interfaces/register.interface";
import { createContext, useContext } from "react";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";

interface IUserProviderData {
  userCreate: (data: IUserCreate) => Promise<true | undefined>;
}

export const UserContext = createContext<IUserProviderData>({} as IUserProviderData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const userCreate = async (data: IUserCreate) => {
    try {
      await api.post("/users", data);
      return true;
    } catch (error: any) {
      console.error(error);
      toast({
        status: "error",
        description:
          error.response.data.message || "Ops, ocorreu um erro. Tente novamente mais tarde",
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
      <UserContext.Provider value={{ userCreate }}>{children}</UserContext.Provider>
    </>
  );
};

export const userContext = () => useContext(UserContext);
