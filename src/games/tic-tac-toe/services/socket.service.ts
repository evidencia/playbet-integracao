import { io, Socket } from 'socket.io-client';
import { IUserInStorage } from '../../../interfaces/IUser';
import { getUserInStorage } from '../../../utils/localStorage';

class SocketService {
  public socket: Socket | null = null;
  private userId: string;

  constructor() {
    const user = getUserInStorage();
    this.userId = user?.id || '';
  }

  public async connect(url: string): Promise<Socket> {
    return new Promise((resolves, rejects) => {
      this.socket = io(url, {
        closeOnBeforeunload: false,
        auth: {
          userId: this.userId,
        },
      });

      if (!this.socket) {
        return rejects();
      }

      this.socket.on('connect', () => {
        resolves(this.socket as Socket);
      });

      this.socket.on('connect_error', (err) => {
        console.log('Connection error: ', err);
        rejects(err);
      });
    });
  }
}

export default new SocketService();
