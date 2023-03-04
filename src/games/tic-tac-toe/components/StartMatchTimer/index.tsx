import { useContext } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import GameContext from '../../contexts/GameContext';
import gameService from '../../services/game.service';
import socketService from '../../services/socket.service';
import { StartingMatchTimer } from './styles';

function StartMatchTimer() {
  const { setGameStarted } = useContext(GameContext);

  const startGame = () => {
    if (!socketService.socket) return;

    setGameStarted(true);
    gameService.startGame(socketService.socket);
  };

  const FIVE_SECONDS = 5000;

  const renderer = ({ seconds }: CountdownRenderProps) => {
    return <StartingMatchTimer>{seconds}</StartingMatchTimer>;
  };

  return (
    <Countdown
      date={Date.now() + FIVE_SECONDS}
      onComplete={startGame}
      renderer={renderer}
    />
  );
}

export default StartMatchTimer;
