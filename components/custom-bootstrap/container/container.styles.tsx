import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const CustomContainer = styled(Container)`
  padding: 10px 20px;
  /* background-color: #212529; */
  height: ${({ height }) => height};
`;
