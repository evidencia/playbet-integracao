import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Header } from '../../components/Header';
import { TableBets } from '../../components/TableBets';
import { Container } from './styles';

export function Bets () {
  return (
    <Container>
      <Header />
      <TableBets />
      <Footer />
      <FooterBottom />
    </Container>
  );
}