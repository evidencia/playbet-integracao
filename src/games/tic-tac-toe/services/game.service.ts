import { Socket } from 'socket.io-client';
import { IResetGame } from '../interfaces/IResetGame';
import { IStartGame } from '../interfaces/IStartGame';
import { IPlayMatrix } from '../interfaces/IPlayMatrix';
import { TimerCountdown } from '../types/TimerCountdown';
import { IGameUpdate } from '../interfaces/IGameUpdate';

class GameService {
  public async updateGame(
    socket: Socket,
    gameMatrix: IPlayMatrix,
    isPlayerTurn: boolean
  ): Promise<void> {
    socket.emit('update_game', { matrix: gameMatrix, isPlayerTurn });
  }

  public async onGameUpdate(
    socket: Socket,
    listener: (gameDetails: IGameUpdate) => void
  ) {
    socket.on('on_game_update', (gameDetails) => listener(gameDetails));
  }

  public async startGame(socket: Socket) {
    const reset = false;
    socket.emit('start_game');
    socket.emit('game_timer', reset);
  }

  public async timer(socket: Socket, listener: (time: TimerCountdown) => void) {
    socket.on('timer', listener);
  }

  public async resetTimer(socket: Socket) {
    const reset = true;
    socket.emit('game_timer', reset);
  }

  public async onGameStart(
    socket: Socket,
    listener: (options: IStartGame) => void
  ) {
    socket.once('on_game_start', listener);
  }

  public async gameWin(socket: Socket, message: string) {
    socket.emit('game_win', { message });
  }

  public async onGameWin(socket: Socket, listener: (message: string) => void) {
    socket.on('on_game_win', ({ message }) => listener(message));
  }

  public async rematch(socket: Socket, message: boolean) {
    socket.emit('rematch', message);
  }

  public async onRematch(socket: Socket, listener: (answer: boolean) => void) {
    return new Promise((resolves, rejects) => {
      socket.on('on_rematch', () => resolves(listener(true)));
      socket.on('rematch_error', () => rejects('User has quit'));
    });
  }

  public async endGame(socket: Socket) {
    socket.emit('stop_timer').emit('game_end');
  }

  public async quitGame(socket: Socket, opponentQuit: boolean = false) {
    socket.emit('stop_timer').emit('quit_game', opponentQuit);
  }

  public async stopGameTimer(socket: Socket) {
    socket.emit('stop_timer');
  }

  public async onQuitGame(
    socket: Socket,
    listener: (opponentHasQuit: boolean) => void
  ) {
    socket.once('on_quit_game', (opponentHasQuit) => listener(opponentHasQuit));
  }

  public async resetGame(socket: Socket, playerTurn: boolean) {
    socket.emit('reset_game', { lastPlayed: playerTurn });
  }

  public async onResetGame(
    socket: Socket,
    listener: (options: IResetGame) => void
  ) {
    socket.on('on_reset_game', listener);
  }

  public async gameResult(
    socket: Socket,
    result: {
      result: 'Vitória' | 'Derrota';
      bet: number;
    }
  ) {
    socket.emit('game_result', result);
  }
}

export default new GameService();
