import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/montserrat";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
