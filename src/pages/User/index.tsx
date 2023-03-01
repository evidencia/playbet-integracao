import { BannerUser } from '../../components/BannerUser';
import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Games } from '../../components/Games';
import { Navbar } from '../../components/Navbar';
import { Container } from './styles';

export function User(){
  return (
    <Container>
      <Navbar />
      <BannerUser />
      <Games />
      <Footer />
      <FooterBottom />
    </Container>
  );
}