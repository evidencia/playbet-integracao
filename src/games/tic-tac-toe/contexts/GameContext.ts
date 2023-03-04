import { createContext, ReactNode } from 'react';
import { GameSymbol } from '../types/GameSymbol';
import { IPlayer } from '../interfaces/IPlayer';

export type GameContextProps = {
  children: ReactNode;
};

export interface IGameContextProps {
  playerSymbol: GameSymbol;
  setPlayerSymbol: (symbol: GameSymbol) => void;
  isPlayerTurn: boolean;
  setPlayerTurn: (turn: boolean) => void;
  isGameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  betValue: number;
  setBetValue: (bet: number) => void;
  hadRematch: boolean;
  setHadRematch: (rematch: boolean) => void;
  quitGame: boolean;
  setQuitGame: (quit: boolean) => void;
  playerOneData: IPlayer;
  setPlayerOneData: (data: IPlayer) => void;
  playerTwoData: IPlayer;
  setPlayerTwoData: (data: IPlayer) => void;
}

const defaultValue: IGameContextProps = {
  playerSymbol: 'x',
  setPlayerSymbol: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
  betValue: 2,
  setBetValue: () => {},
  hadRematch: false,
  setHadRematch: () => {},
  quitGame: false,
  setQuitGame: () => {},
  playerOneData: { name: '' },
  setPlayerOneData: () => {},
  playerTwoData: { name: '' },
  setPlayerTwoData: () => {},
};

const GameContext = createContext(defaultValue);

export default GameContext;
