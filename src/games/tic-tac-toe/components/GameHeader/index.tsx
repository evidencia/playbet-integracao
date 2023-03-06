import { grey } from '@mui/material/colors';
import { useContext, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useTranslation } from 'react-i18next';
import { FiFlag } from 'react-icons/fi';
import GameContext from '../../contexts/GameContext';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Avatar, Box, SvgIcon } from '@mui/material';
import chatService from '../../services/chat.service';
import gameService from '../../services/game.service';
import socketService from '../../services/socket.service';
import SpeechEmoji from '../../assets/images/speech-emoji.png';
import SpeechEmojiAlt from '../../assets/images/speech-emoji-alt.png';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import TurnVolumeButton from '../TurnVolumeButton';
import { VolumeButtonContainer } from '../TurnVolumeButton/styles';
import getEmojiType from '../../utils/getEmojiType';
import {
  selectPlayerOneEmoji,
  selectPlayerTwoEmoji,
  selectRoundTime,
  setPlayerTwoEmoji,
  setRoundTime,
} from '../../redux/slices/matchSlice';
import {
  PlayerContainer,
  PlayerName,
  GameHeaderContainer,
  PlayerNameAndSymbol,
  TimerBar,
  PlayerEmoji,
  EmojiContainer,
  Emoji,
  LeaveButton,
} from './styles';
import playEmojiSound from '../../utils/playEmojiSound';
import clearListeners from '../../utils/clearListeners';
import emojisData from '../../assets/images/emojis/emojisData';

interface GameHeaderProps {
  gameResult: string;
  skipPlayerTurn: () => void;
  setAlert: (alert: string) => void;
  handleQuitGame: () => void;
}

function GameHeader({
  gameResult,
  skipPlayerTurn,
  setAlert,
  handleQuitGame,
}: GameHeaderProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const playerOneEmoji = useAppSelector(selectPlayerOneEmoji);
  const playerTwoEmoji = useAppSelector(selectPlayerTwoEmoji);
  const isVolumeOn = useAppSelector(selectVolumeConfig);
  const roundTime = useAppSelector(selectRoundTime);

  const {
    playerOneData,
    playerTwoData,
    playerSymbol,
    isPlayerTurn,
    isGameStarted,
    hadRematch,
    betValue,
  } = useContext(GameContext);

  useBeforeunload(() => {
    if (!socketService.socket) return;

    const drawResult = gameResult === 'Empate';

    if (!gameResult || drawResult) {
      const opponentHasQuit = !gameResult || !hadRematch;
      gameService.rematch(socketService.socket, false);
      gameService.quitGame(socketService.socket, opponentHasQuit, betValue);
    }
  });

  const getEmoji = (id: number) => {
    const emoji = emojisData[getEmojiType(id)].find((emoji) => emoji.id === id);

    if (!emoji) return;

    return emoji.gif ? emoji.gif : <Emoji src={emoji.icon} alt={emoji.name} />;
  };

  const handleEmojiReceive = () => {
    if (!socketService.socket) return;

    socketService.socket.removeAllListeners('emoji_sent');

    chatService.receiveEmoji(socketService.socket, (emoji) => {
      dispatch(setPlayerTwoEmoji(emoji));

      if (emoji) {
        playEmojiSound(isVolumeOn, emoji);
        soundPlay(isVolumeOn, soundsData.receiveEmoji);
      }
    });
  };

  const handleTimer = () => {
    if (!socketService.socket) return;

    gameService.timer(socketService.socket, (time) => {
      dispatch(setRoundTime(time.countdown));
    });
  };

  useEffect(() => {
    handleTimer();
    handleQuitGame();

    return () => {
      clearListeners();
    };
  }, []);

  useEffect(() => {
    if (roundTime === 0) setTimeout(skipPlayerTurn, 1000);
  }, [roundTime]);

  useEffect(() => {
    handleEmojiReceive();
  }, [isVolumeOn]);

  const isPlayerOneTurn = playerSymbol && isPlayerTurn && !gameResult;
  const isPlayerTwoTurn = playerSymbol && !isPlayerTurn && !gameResult;

  return (
    <GameHeaderContainer>
      <LeaveButton
        sx={{ backgroundColor: grey[900], position: 'absolute' }}
        aria-label={`${t('desistir')}`}
        onClick={() => setAlert('Tem certeza que deseja desistir?')}
      >
        <FiFlag size={28} color='white' />
      </LeaveButton>

      <VolumeButtonContainer
        style={{ backgroundColor: grey[900], top: 'auto' }}
      >
        <TurnVolumeButton />
      </VolumeButtonContainer>

      <PlayerContainer isPlayerTurn={isPlayerTurn}>
        <PlayerNameAndSymbol style={{ zIndex: 1 }}>
          <PlayerName>{playerOneData.name.split('').slice(0, 6)}</PlayerName>
          <p>{playerSymbol.toUpperCase()}</p>
        </PlayerNameAndSymbol>

        {playerOneEmoji && (
          <PlayerEmoji style={{ right: 30 }}>
            <EmojiContainer>
              <Box
                component='img'
                src={SpeechEmoji}
                alt='emoji chat'
                width={75}
                height={75}
              />
              {getEmoji(playerOneEmoji)}
            </EmojiContainer>
          </PlayerEmoji>
        )}

        <Avatar sx={{ zIndex: 1 }} alt={playerOneData.name}>
          {playerOneData.name.split('')[0]}
        </Avatar>

        {isGameStarted && isPlayerOneTurn && (
          <TimerBar
            completed={`${roundTime}`}
            isLabelVisible={false}
            transitionDuration='1s'
            width='125px'
            height='66px'
            maxCompleted={15}
            baseBgColor='#121212'
            transitionTimingFunction='linear'
            bgColor='#05d27c'
            borderRadius='12px'
          />
        )}
      </PlayerContainer>

      <PlayerContainer isPlayerTurn={!isPlayerTurn}>
        <Avatar sx={{ zIndex: 1 }} alt={playerTwoData.name}>
          {playerTwoData.name.split('')[0]}
        </Avatar>

        <PlayerNameAndSymbol>
          <PlayerName>{playerTwoData.name.split('').slice(0, 6)}</PlayerName>
          <p>{playerSymbol === 'x' ? 'O' : 'X'}</p>
        </PlayerNameAndSymbol>

        {playerTwoEmoji && (
          <PlayerEmoji style={{ left: 30 }}>
            <EmojiContainer>
              <Box
                component='img'
                src={SpeechEmojiAlt}
                alt='emoji chat'
                width={75}
                height={75}
              />
              {getEmoji(playerTwoEmoji)}
            </EmojiContainer>
          </PlayerEmoji>
        )}

        {isGameStarted && isPlayerTwoTurn && (
          <TimerBar
            completed={`${roundTime}`}
            isLabelVisible={false}
            transitionDuration='1s'
            width='125px'
            height='66px'
            maxCompleted={15}
            baseBgColor='#121212'
            transitionTimingFunction='linear'
            borderRadius='12px'
            bgColor='#05d27c'
          />
        )}
      </PlayerContainer>
    </GameHeaderContainer>
  );
}

export default GameHeader;
