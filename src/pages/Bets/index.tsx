import { Footer } from '../../components/Footer';
import { FooterBottom } from '../../components/FototerBottom';
import { Navbar } from '../../components/Navbar';
import { TableBets } from '../../components/TableBets';
import { Container } from './styles';

export function Bets () {
  return (
    <Container>
      <Navbar />
      <TableBets />
      <Footer />
      <FooterBottom />
    </Container>
  );
}