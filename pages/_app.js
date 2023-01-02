import '../styles/globals.css';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import superjson from 'superjson';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            staleTime: 10 * 1000 * 60, // 10 min
            cacheTime: 10 * 1000 * 60, // 10 min
          },
        },
      })
  );
  const { _superjson, ...props } = pageProps;

  const deserializedProps = superjson.deserialize({ json: props, meta: _superjson });

  return (
    <QueryClientProvider client={queryClient}>
      {/* The workaround I used to fix the issue is the following */}
      {/* <Hydrate state={deserializedProps.dehydratedState}> */}
      <Hydrate state={props.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
