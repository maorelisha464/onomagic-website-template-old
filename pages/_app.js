import '../styles/global.css'
import Script from 'next/script';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { AdvertisingWrapper } from '../context/advertisingContext';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Script src={"https://securepubads.g.doubleclick.net/tag/js/gpt.js"} strategy="beforeInteractive" async />
      <Script src={"/onomagic-prebid7.13.0.js"} strategy="beforeInteractive" async />
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <AdvertisingWrapper>
          <Component {...pageProps} />
        </AdvertisingWrapper>
      </MantineProvider>
    </>
  );
}
