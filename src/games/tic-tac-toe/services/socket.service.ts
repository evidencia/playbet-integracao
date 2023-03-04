import { io, Socket } from 'socket.io-client';
class SocketService {
  public socket: Socket | null = null;

  public async connect(url: string): Promise<Socket> {
    return new Promise((resolves, rejects) => {
      this.socket = io(url, {
        closeOnBeforeunload: false,
        query: { userId: 'userId' },
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
