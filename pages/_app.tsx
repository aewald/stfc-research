import App from 'next/app';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/index.scss';

import { Navigation } from 'components/navigation';
import { Footer } from 'components/footer';
import { Container } from 'react-bootstrap';

const MyApp = ({ Component, pageProps }) => (
  <>
    <Navigation />
    <Container>
      <Component {...pageProps} />
    </Container>
    <Footer />
  </>
);

MyApp.getInitialProps = async (context) => {
  const initialProps = App.getInitialProps && (await App.getInitialProps(context));
  return { pageProps: { ...initialProps.pageProps } };
};

export default MyApp;
