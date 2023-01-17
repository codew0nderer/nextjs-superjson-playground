import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const getPost = () => ({ title: 'post', dateValue: new Date() });

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['post'], getPost);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home(props) {
  const { data } = useQuery(['post'], getPost);

  console.log('useQuery - dateValue : ', data.dateValue);
  console.log('useQuery - dateValue typeof : ', typeof data.dateValue);
  // Expected behavior is for data.dateValue to be instanceof Date
  console.log('useQuery - dateValue instanceof Date: ', data.dateValue instanceof Date);

  return <>Check console logs!</>;
}
