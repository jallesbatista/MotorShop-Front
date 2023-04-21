import { IUserCreate } from "@/interfaces/register.interface";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";

interface IUserProviderData {
  userCreate: (data: IUserCreate) => Promise<void>;
  successModal: boolean;
  setSuccessModal: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<IUserProviderData>({} as IUserProviderData);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const [successModal, setSuccessModal] = useState(false);

  const userCreate = async (data: IUserCreate) => {
    try {
      await api.post("/users", data);

      setSuccessModal(true);
    } catch (error) {
      console.error(error);
      toast({
        status: "error",
        description: "Ops, ocorreu um erro...",
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
      <UserContext.Provider value={{ userCreate, successModal, setSuccessModal }}>
        {children}
      </UserContext.Provider>
    </>
  );
};

export const userContex = () => useContext(UserContext);
