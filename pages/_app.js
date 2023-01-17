import '../styles/globals.css';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { deserializeProps } from "babel-plugin-superjson-next/tools";

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
  const { dehydratedState, ...deserializedProps } = deserializeProps(pageProps);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <Component {...deserializedProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
