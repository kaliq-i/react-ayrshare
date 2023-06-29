import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import styles from '../styles/Home.module.css';
import { useAyrshare } from 'react-ayrshare';

export default function Home() {
  const { ayrshareLogin } = useAyrshare({
    redirectUri: `${
      typeof window === 'object' && window.location.origin
    }/ayrshare`,
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  const someApiCall = () => {
    return {
      authUrl: '',
    };
  };

  const connectSocials = () => {
    const { authUrl } = someApiCall();
    ayrshareLogin(authUrl);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
          <button
            alt="Connect socials"
            width={180}
            height={32}
            onClick={connectSocials}
          >
            Connect your socials
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}