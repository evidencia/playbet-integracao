import { Socket } from 'socket.io-client';

class ChatService {
  public async sendEmoji(socket: Socket, emoji: number | null) {
    socket.emit('send_emoji', emoji);
  }

  public async receiveEmoji(
    socket: Socket,
    listener: (emoji: number | null) => void
  ) {
    socket.on('emoji_sent', listener);
  }
}

export default new ChatService();
