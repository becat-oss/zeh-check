import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from 'src/theme/ThemeContext';
// import '../styles/globals.css';
import "react-datasheet/lib/react-datasheet.css";
import "react-datasheet-grid/dist/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Head>
        <title>iRDT Tool Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
