import GameResultDraw from '../GameResultDraw';
import GameResult from '../GameResult';
import { useEffect } from 'react';
import socketService from '../../services/socket.service';
import gameService from '../../services/game.service';

interface ResultsModalProps {
  gameResult: string;
  setGameResult: (result: string) => void;
  resetGame: () => void;
  endGame: () => void;
}

function ResultsModal({
  gameResult,
  setGameResult,
  resetGame,
  endGame,
}: ResultsModalProps) {
  const stopGameTimer = () => {
    if (socketService.socket) {
      gameService.stopGameTimer(socketService.socket);
    }
  };

  useEffect(() => {
    stopGameTimer();
  }, []);

  return (
    <div>
      <>
        {gameResult === 'Empate' ? (
          <GameResultDraw
            resetGame={resetGame}
            gameResult={gameResult}
            endGame={endGame}
            setGameResult={setGameResult}
          />
        ) : (
          <GameResult gameResult={gameResult} endGame={endGame} />
        )}
      </>
    </div>
  );
}

export default ResultsModal;
