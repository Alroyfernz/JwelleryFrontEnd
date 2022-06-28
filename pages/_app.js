import "../styles/Product.css";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles/globals.css";
import Layout from "../Layout/MainLayout/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)
  const [queryClient] = React.useState(() => new QueryClient());

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </Layout>
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
