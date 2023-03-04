import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import socketService from './services/socket.service';
import store from './redux/store';
import Game from './pages/Game';
import GameProvider from './contexts/GameProvider';
import { AppContainer } from './assets/styles';
import { betplayTheme } from './assets/themes/betplay';
import './index.css';
import './i18n';

export default function TicTacToe() {
  const connectSocket = async () => {
    await socketService.connect('http://localhost:8090').catch((err) => {
      console.error('Offline server: ', err);
    });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <Provider store={store}>
      <GameProvider>
        <ThemeProvider theme={betplayTheme}>
          <CssBaseline />
          <AppContainer>
            <Game />
          </AppContainer>
        </ThemeProvider>
      </GameProvider>
    </Provider>
  );
}
