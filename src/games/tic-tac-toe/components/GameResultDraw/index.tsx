import { useContext, useEffect, useState } from 'react';
import gameService from '../../services/game.service';
import socketService from '../../services/socket.service';
import RematchButton from '../RematchButton';
import GameContext from '../../contexts/GameContext';
import { Box, DialogContentText } from '@mui/material';
import QuitGameButton from '../QuitGameButton';
import formatToBRL from '../../utils/formatToBRL';
import {
  GameBetResult,
  GameResultButtons,
  GameResultContainer,
  GameResultText,
  PlayerBalanceContainer,
  ResultContainer,
} from '../GameResult/styles';
import { useAppSelector } from '../../redux/hooks';
import { selectBalance } from '../../redux/slices/playerSlice';
import { useTranslation } from 'react-i18next';
import AlertModal from '../AlertModal';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';
import { AlertContainer } from '../AlertModal/styles';

interface GameResultDrawProps {
  gameResult: string;
  setGameResult: (result: string) => void;
  resetGame: () => void;
  endGame: () => void;
}

function GameResultDraw({
  gameResult,
  setGameResult,
  resetGame,
  endGame,
}: GameResultDrawProps) {
  const { t } = useTranslation();
  const [rematch, setRematch] = useState(false);
  const [opponentRematchAnswer, setOpponentRematchAnswer] = useState(false);
  const playerBalance = useAppSelector(selectBalance);
  const isVolumeOn = useAppSelector(selectVolumeConfig);

  const { betValue, setHadRematch, quitGame, setQuitGame } =
    useContext(GameContext);

  const betPrize = formatToBRL(betValue);

  const handleGameRematch = async () => {
    if (!socketService.socket) return;

    await gameService
      .onRematch(socketService.socket, (opponentAnswer) => {
        setOpponentRematchAnswer(opponentAnswer);
      })
      .catch(() => setQuitGame(true));
  };

  useEffect(() => {
    soundPlay(isVolumeOn, soundsData.draw);
  }, []);

  useEffect(() => {
    if (!opponentRematchAnswer) {
      handleGameRematch();
    }

    if (rematch && opponentRematchAnswer) {
      setGameResult('');
      resetGame();
      setHadRematch(true);
    }
  }, [rematch, opponentRematchAnswer]);

  return (
    <div>
      {quitGame && (
        <AlertModal
          alertText={t('O oponente saiu da partida')}
          handleClose={endGame}
        />
      )}
      <AlertContainer
        hideBackdrop
        disableScrollLock
        disableEnforceFocus
        disableAutoFocus
        open={!!gameResult}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <GameResultContainer>
          <GameResultText>{t('Resultado')}</GameResultText>

          <Box>
            <ResultContainer>
              <GameBetResult>{t('Empate')}</GameBetResult>

              <DialogContentText fontWeight='bold'>
                {betPrize}
              </DialogContentText>
            </ResultContainer>

            <PlayerBalanceContainer>
              <DialogContentText style={{ cursor: 'default' }}>
                {t('Saldo atual')}
              </DialogContentText>

              <DialogContentText fontWeight='bold'>
                {formatToBRL(playerBalance)}
              </DialogContentText>
            </PlayerBalanceContainer>
          </Box>

          <GameResultButtons style={{ justifyContent: 'center' }}>
            <QuitGameButton endGame={endGame} buttonText={t('Sair')} />

            <RematchButton
              rematch={rematch}
              setRematch={setRematch}
              opponentHasQuit={quitGame}
            />
          </GameResultButtons>
        </GameResultContainer>
      </AlertContainer>
    </div>
  );
}

export default GameResultDraw;
