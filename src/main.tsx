import React from "react";
import ReactDOM from "react-dom/client";
// import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

// import theme from "./theme.ts";
// import "./index.css";
import router from "./routes.tsx";

export interface ProcessEnv {
  [key: string]: string | undefined;
}

const queryClient = new QueryClient();

const nodeEnv: string = process.env.NODE_ENV as string;

console.log("Process Check : ", nodeEnv);
// console.log("Process Check : ", process.env);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ChakraProvider theme={theme}> */}
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
