import { useQuery } from '@apollo/react-hooks';
import { GET_OFFICERS, GET_OFFICER } from 'apollo/queries';

export const useGetOfficers = () => useQuery(GET_OFFICERS);
export const useGetOfficer = (id) => useQuery(GET_OFFICER, { variables: { id } });
