import customTheme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { UserProvider } from "@/contexts/UserContext";
import { PosterProvider } from "@/contexts/PosterContext";
import { AuthProvider } from "@/contexts/AuthContext";
import type { AppProps } from "next/app";
import "@fontsource/inter";
import "@fontsource/lexend";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <UserProvider>
          <PosterProvider>
            <Component {...pageProps} />
          </PosterProvider>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
