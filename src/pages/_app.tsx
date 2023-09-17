import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'rrweb-player/dist/style.css'; // Import styles for the rrweb player

function MyApp({ Component, pageProps }:AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
