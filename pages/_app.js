import "../styles/global.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import AdsLibScripts from "../components/ads/adsLibScripts";

export default function App(props) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AdsLibScripts />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          // breakpoints: {
          //   xs: 500,
          //   sm: 800,
          //   md: 1000,
          //   lg: 1275,
          //   xl: 1800,
          // },
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
