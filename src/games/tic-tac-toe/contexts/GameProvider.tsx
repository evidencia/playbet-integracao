import { useState } from 'react';
import { IPlayer } from '../interfaces/IPlayer';
import { GameSymbol } from '../types/GameSymbol';
import emptyPlayer from '../utils/emptyPlayer';
import GameContext, { GameContextProps } from './GameContext';

function GameProvider({ children }: GameContextProps) {
  const [playerSymbol, setPlayerSymbol] = useState<GameSymbol>('');
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [betValue, setBetValue] = useState(2);
  const [hadRematch, setHadRematch] = useState(false);
  const [quitGame, setQuitGame] = useState(false);
  const [playerOneData, setPlayerOneData] = useState<IPlayer>(emptyPlayer);
  const [playerTwoData, setPlayerTwoData] = useState<IPlayer>(emptyPlayer);

  const gameContextValue = {
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
    betValue,
    setBetValue,
    hadRematch,
    setHadRematch,
    quitGame,
    setQuitGame,
    playerOneData,
    setPlayerOneData,
    playerTwoData,
    setPlayerTwoData,
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
