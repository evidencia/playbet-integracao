import { useEffect } from 'react';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import Game from '../../games/tic-tac-toe';

export function TicTacToe() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Game />
      <Footer />
    </>
  );
}
