import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Router from 'next/router';
import withGA from 'next-ga';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import wildmagicon from '../assets/images/wild-magicon.png';
import fullTexticon from '../assets/images/wildmagic-og.png';
import '../styles/app.less';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>WildMagic | Games, but like for 2019</title>
          <meta name="theme-color" content="#FCE5FF" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href={wildmagicon} />
          <meta
            property="og:title"
            content="WildMagic | Games, but like for 2019"
          />
          <meta
            property="og:description"
            content="Crawl through a dungeon and explore the features of a wild-magic enabled game."
          />
          <meta property="og:image" content={fullTexticon} />
          <meta property="og:url" content="https://wildmagic.io" />
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withGA('UA-105796271-5', Router)(withReduxStore(MyApp));
