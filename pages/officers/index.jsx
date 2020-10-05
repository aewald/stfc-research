import { useGetOfficers } from 'apollo/actions';
import withApollo from 'hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

import Link from 'next/link';

const colors = { epic: '#c040ff', rare: '#0090c8', uncommon: '#00a030', common: '#ffffff' };

const Officers = () => {
  const { loading, data } = useGetOfficers();

  if (loading) return <p>Loading...</p>;

  const officers = (data && data.officers) || [];

  return (
    <>
      <h1>Officers</h1>
      <div>
        {officers.map(({ _id, name, rarity }) => (
          <div>
            <Link key={_id} href="/officers/[id]" as={`/officers/${_id}`}>
              <a style={{ color: colors[`${rarity.toLowerCase()}`] }}>{name}</a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default withApollo(Officers, { getDataFromTree });
