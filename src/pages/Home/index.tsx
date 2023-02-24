import { Banner } from '../../components/Banner';
import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Games } from '../../components/Games';
import { Container } from './styles';

export function Home(){
  return (
    <Container>
      <Banner />
      <Games />
      <Footer />
      <FooterBottom />
    </Container>
  );
}