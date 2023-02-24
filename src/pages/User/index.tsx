import { BannerUser } from '../../components/BannerUser';
import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Games } from '../../components/Games';
import { Header } from '../../components/Header';
import { Container } from './styles';

export function User(){
  return (
    <Container>
      <Header />
      <BannerUser />
      <Games />
      <Footer />
      <FooterBottom />
    </Container>
  );
}