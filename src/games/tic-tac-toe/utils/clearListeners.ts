import socketService from '../services/socket.service';

export default function clearListeners() {
  if (socketService.socket) {
    const listeners = [
      'timer',
      'emoji_sent',
      'on_game_start',
      'on_game_update',
      'on_game_win',
      'on_rematch',
      'on_quit_game',
      'on_reset_game',
      'fetch_players',
    ];

    for (let i = 0; i < listeners.length; i += 1) {
      socketService.socket.removeAllListeners(listeners[i]);
    }
  }
}
