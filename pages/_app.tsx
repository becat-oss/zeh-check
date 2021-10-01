import React from 'react';
import type { AppProps } from 'next/app';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from 'src/theme/ThemeContext';
// import '../styles/globals.css';
import "react-datasheet/lib/react-datasheet.css";
import "react-datasheet-grid/dist/style.css";

Amplify.configure({
  aws_appsync_region: "ap-northeast-1", 
  aws_appsync_graphqlEndpoint: "https://v2gicoxghfhc7fzzk6xmkppvxa.appsync-api.ap-northeast-1.amazonaws.com/graphql",
  aws_appsync_authenticationType: "API_KEY", 
  aws_appsync_apiKey: "da2-kss7hw7l7beazocqqykqouzgoa",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Head>
        <title>BeCAT Tool Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
