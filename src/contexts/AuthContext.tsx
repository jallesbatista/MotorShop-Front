import { IUserLogin } from "@/interfaces/user.interfaces";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthProviderData {
  logIn: (data: IUserLogin) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext({} as IAuthProviderData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null); // Colocar tipagem a partir dos dados retornados do usuário

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const { "ecommerce.token": token } = parseCookies();
      if (token) {
        try {
          const response = await api.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error: any) {
          console.log(error);
          destroyCookie(null, "ecommerce.token");
          router.push("/login");
          toast({
            position: "bottom-right",
            title: "Sua sessão expirou :(",
            containerStyle: {
              color: "white",
            },
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };
    getUserData();
  }, []);

  const logIn = async (data: IUserLogin) => {
    try {
      const response = await api.post("/login", data);

      setCookie(null, "ecommerce.token", response.data.token, {
        maxAge: 60 * 30, // 30 minutos
        path: "/",
      });

      toast({
        position: "bottom-right",
        title: "Logado com sucesso",
        containerStyle: {
          color: "white",
        },
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast({
        position: "bottom-right",
        title: error.response?.data.message || "Ops, ocorreu um erro. Tente novamente mais tarde",
        containerStyle: {
          color: "white",
        },
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const logOut = () => {
    destroyCookie(null, "ecommerce.token");
    setUser(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ logIn, logOut }}>{children}</AuthContext.Provider>;
};

export const authContext = () => useContext(AuthContext);
