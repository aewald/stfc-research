import { useGetOfficer } from 'apollo/actions';
import withApollo from 'hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import { OfficerDetailsTemplate } from 'components/officer-details';

const OfficerDetail = ({ query }) => {
  const { loading, data } = useGetOfficer(query.id);

  if (loading) return <p>Loading...</p>;

  const officer = (data && data.officer) || {};

  return (
    <>
      <OfficerDetailsTemplate {...officer} />
    </>
  );
};

OfficerDetail.getInitialProps = ({ query }) => ({ query });

export default withApollo(OfficerDetail, { getDataFromTree });
