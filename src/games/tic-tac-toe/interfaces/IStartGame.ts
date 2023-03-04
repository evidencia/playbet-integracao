import { GameSymbol } from '../types/GameSymbol';
import { IResetGame } from './IResetGame';

export interface IStartGame extends IResetGame {
  symbol: GameSymbol;
}
