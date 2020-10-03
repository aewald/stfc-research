import { useQuery } from '@apollo/react-hooks';
import { GET_OFFICERS } from 'apollo/queries';

export const useGetOfficers = () => useQuery(GET_OFFICERS);
