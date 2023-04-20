import customTheme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "@fontsource/inter";
import "@fontsource/lexend";
import { PosterProvider } from "@/contexts/PosterContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <PosterProvider>
        <Component {...pageProps} />
      </PosterProvider>
    </ChakraProvider>
  );
}
