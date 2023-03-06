import { useContext, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';
import { Box, DialogContentText } from '@mui/material';
import QuitGameButton from '../QuitGameButton';
import { green, red } from '@mui/material/colors';
import formatToBRL from '../../utils/formatToBRL';
import {
  selectBalance,
  setPlayerBalance,
} from '../../redux/slices/playerSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  GameBetResult,
  GameResultButtons,
  GameResultContainer,
  GameResultText,
  PlayerBalanceContainer,
  ResultContainer,
} from './styles';
import { useTranslation } from 'react-i18next';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';
import socketService from '../../services/socket.service';
import gameService from '../../services/game.service';
import { AlertContainer } from '../AlertModal/styles';

interface GameResultProps {
  gameResult: string;
  endGame: () => void;
}

function GameResult({ gameResult, endGame }: GameResultProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const playerBalance = useAppSelector(selectBalance);
  const isVolumeOn = useAppSelector(selectVolumeConfig);

  const { betValue } = useContext(GameContext);

  const formattedPrize = formatToBRL(betValue);

  const playerWon =
    gameResult === 'Vitória' || gameResult === 'Oponente desistiu';

  const updatePlayerBalance = () => {
    if (!socketService.socket) return;

    if (playerWon) {
      const newBalance = playerBalance + betValue;

      gameService.gameResult(socketService.socket, {
        bet: betValue,
        result: 'Vitória',
      });
      dispatch(setPlayerBalance(newBalance));
      soundPlay(isVolumeOn, soundsData.win);
    }

    if (gameResult === 'Derrota') {
      const newBalance = playerBalance - betValue;

      gameService.gameResult(socketService.socket, {
        bet: betValue,
        result: 'Derrota',
      });
      dispatch(setPlayerBalance(newBalance));
      soundPlay(isVolumeOn, soundsData.lose);
    }
  };

  useEffect(() => {
    updatePlayerBalance();
  }, []);

  const greenColor = green[500];
  const redColor = red[500];

  return (
    <div>
      <AlertContainer
        hideBackdrop
        disableScrollLock
        disableEnforceFocus
        disableAutoFocus
        open={['Vitória', 'Derrota'].includes(gameResult)}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <GameResultContainer>
          <GameResultText>{t('Resultado')}</GameResultText>

          <Box>
            <ResultContainer>
              <GameBetResult color={playerWon ? greenColor : redColor}>
                {t(gameResult)}
              </GameBetResult>

              <DialogContentText
                color={playerWon ? greenColor : redColor}
                fontWeight='bold'
              >
                {`${playerWon ? '+' : '-'}${formattedPrize}`}
              </DialogContentText>
            </ResultContainer>

            <PlayerBalanceContainer>
              <GameBetResult>{t('Saldo atual')}</GameBetResult>

              <DialogContentText fontWeight='bold'>
                {formatToBRL(
                  playerWon
                    ? playerBalance + betValue
                    : playerBalance - betValue
                )}
              </DialogContentText>
            </PlayerBalanceContainer>
          </Box>

          <GameResultButtons style={{ justifyContent: 'center' }}>
            <QuitGameButton endGame={endGame} buttonText={'Menu principal'} />
          </GameResultButtons>
        </GameResultContainer>
      </AlertContainer>
    </div>
  );
}

export default GameResult;
