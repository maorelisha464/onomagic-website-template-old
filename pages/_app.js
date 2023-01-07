import '../styles/global.css'
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <script
          async="async"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script>
          var googletag = googletag || Object();
          googletag.cmd = googletag.cmd || [];
          console.log(googletag);
        </script>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
