import { IUser, IUserLogin } from "@/interfaces/user.interfaces";
import api from "@/services/api";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthProviderData {
  logIn: (data: IUserLogin) => Promise<void>;
  logOut: () => void;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext({} as IAuthProviderData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null); // Colocar tipagem a partir dos dados retornados do usuário
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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
          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          setCookie(null, "ecommerce.user.id", response.data.id, {
            maxAge: 60 * 30, // 30 minutos
            path: "/",
          });
          setCookie(null, "ecommerce.user.seller", response.data.is_seller, {
            maxAge: 60 * 30, // 30 minutos
            path: "/",
          });
        } catch (error: any) {
          console.log(error);
          if (!toast.isActive("expired")) {
            toast({
              position: "bottom-right",
              title: "Sua sessão expirou :(",
              containerStyle: {
                color: "white",
              },
              status: "warning",
              duration: 3000,
              isClosable: true,
              id: "expired",
            });
          }
          destroyCookie(null, "ecommerce.token", {
            path: "/",
          });
          destroyCookie(null, "ecommerce.user.seller", {
            path: "/",
          });
          destroyCookie(null, "ecommerce.user.id", {
            path: "/",
          });
          setUser(null);
          // router.push("/home");
        }
      }
    };
    getUserData();
  }, [, isAuthenticated]);

  const logIn = async (data: IUserLogin) => {
    try {
      const response = await api.post("/login", data);

      setCookie(null, "ecommerce.token", response.data.token, {
        maxAge: 60 * 30, // 30 minutos
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;
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
      setIsAuthenticated(true);
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
    destroyCookie(null, "ecommerce.token", {
      path: "/",
    });
    destroyCookie(null, "ecommerce.user.seller", {
      path: "/",
    });
    destroyCookie(null, "ecommerce.user.id", {
      path: "/",
    });
    setUser(null);
    setIsAuthenticated(false);
    toast({
      position: "bottom-right",
      title: "Deslogado com sucesso",
      containerStyle: {
        color: "white",
      },
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ logIn, logOut, user, setUser }}>{children}</AuthContext.Provider>
  );
};

export const authContext = () => useContext(AuthContext);
