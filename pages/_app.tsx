import type { AppProps } from 'next/app';
import { Auth0Provider } from "@auth0/auth0-react";
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECTURI}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
