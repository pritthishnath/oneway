import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Head>
          <title>Oneway</title>
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}
