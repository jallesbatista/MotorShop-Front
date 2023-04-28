import { IResetPasswordRequest, IUserCreate } from "@/interfaces/user.interfaces";
import { createContext, useContext } from "react";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { IForgotPassword } from "@/interfaces/forgotPassword.interfaces";

interface IUserProviderData {
  userCreate: (data: IUserCreate) => Promise<true | undefined>;
  sendResetPassworEmail: (data: IForgotPassword) => Promise<void>;
  resetPassword: (data: IResetPasswordRequest, resetToken: string) => Promise<true | undefined>;
}

export const UserContext = createContext<IUserProviderData>({} as IUserProviderData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();
  const router = useRouter();

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

  const sendResetPassworEmail = async (data: IForgotPassword) => {
    try {
      await api.post("/resetPassword", data);

      toast({
        status: "success",
        description: "Email enviado",
        duration: 3000,
        position: "bottom-right",
        containerStyle: {
          color: "white",
        },
        isClosable: true,
      });
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

  const resetPassword = async (data: IResetPasswordRequest, resetToken: string) => {
    try {
      await api.patch(`/resetPassword/${resetToken}`, data);

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

  return (
    <>
      <UserContext.Provider value={{ userCreate, sendResetPassworEmail, resetPassword }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const userContext = () => useContext(UserContext);
