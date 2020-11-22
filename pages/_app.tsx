import type { AppProps } from 'next/app';
import { Auth0Provider } from "@auth0/auth0-react";
import { ConnectedRouter } from 'connected-next-router';
import { wrapper } from '../store';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENTID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECTURI}
    >
      <ConnectedRouter>
        <Component {...pageProps} />
      </ConnectedRouter>
    </Auth0Provider>
  );
}

export default wrapper.withRedux(MyApp);
