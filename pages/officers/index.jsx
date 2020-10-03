import { useGetOfficers } from 'apollo/actions';
import withApollo from 'hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

const Officers = () => {
  const { data } = useGetOfficers();
  console.log(data);
  return (
    <>
      <h1>Officers</h1>
      <p>{JSON.stringify(data.officers)}</p>
    </>
  );
};

export default withApollo(Officers, { getDataFromTree });
