import { IPlayMatrix } from './IPlayMatrix';

export interface IGameUpdate {
  matrix: IPlayMatrix;
  isPlayerTurn: boolean;
}
