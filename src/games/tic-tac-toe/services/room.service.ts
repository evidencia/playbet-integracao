import { Socket } from 'socket.io-client';
import IGameRoom from '../interfaces/IGameRoom';

class RoomService {
  public async createGameRoom(
    socket: Socket,
    roomType: string,
    bet: number
  ): Promise<boolean> {
    const room = {
      bet,
      private: roomType === 'private' ? true : false,
    };

    return new Promise((resolves, rejects) => {
      socket.emit('create_game_room', room);

      socket.on('room_joined', ({ roomCode }) => resolves(roomCode));

      socket.on('room_join_error', ({ error }) => rejects(error));
    });
  }

  public async searchGameRoom(socket: Socket, bet: number): Promise<boolean> {
    return new Promise((resolves, rejects) => {
      socket.emit('search_game_room', bet);

      socket.on('room_search_error', ({ error }) => rejects(error));

      socket.on('room_joined', () => resolves(true));

      socket.on('room_join_error', ({ error }) => rejects(error));
    });
  }

  public async joinRoom(socket: Socket, roomId: string): Promise<boolean> {
    const room = {
      id: roomId,
      private: true,
    };

    return new Promise((resolves, rejects) => {
      socket.emit('join_game_room', room);

      socket.on('room_joined', () => resolves(true));

      socket.on('room_join_error', ({ error }) => rejects(error));
    });
  }

  public async roomInformations(socket: Socket, roomId: string) {
    return new Promise((resolves, rejects) => {
      socket.emit('room_informations', roomId);

      socket.on('return_room_informations', (room: IGameRoom) =>
        resolves(room)
      );

      socket.on('room_join_error', ({ error }) => rejects(error));
    });
  }

  public async leaveRoom(socket: Socket) {
    socket.emit('leave_room');
  }

  public async fetchPlayers(
    socket: Socket,
    listener: (opponent: string) => void
  ) {
    socket.on('fetch_players', (opponent) => listener(opponent));
  }
}

export default new RoomService();
