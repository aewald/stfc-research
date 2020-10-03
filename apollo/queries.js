import { gql } from 'apollo-boost';

export const GET_OFFICERS = gql`
  query Officers {
    officers {
      _id
      name
      description
      rarity
    }
  }
`;
