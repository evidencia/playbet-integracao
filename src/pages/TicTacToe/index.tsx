import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import Game from '../../games/tic-tac-toe';
import { getUserInStorage } from '../../utils/localStorage';

export function TicTacToe() {
  const navigate = useNavigate();

  const validateUser = () => {
    const isUserLoggedIn = getUserInStorage();
    if (!isUserLoggedIn) {
      navigate('/');
    }
  };

  useEffect(() => {
    validateUser();
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
