import { ReactNode, useContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import socketService from '../../services/socket.service';
import GameContext from '../../contexts/GameContext';
import { Button, DialogTitle, IconButton } from '@mui/material';
import { IoMdArrowBack } from 'react-icons/io';
import { FiCopy } from 'react-icons/fi';
import copyRoomCodeToClipboard from '../../utils/copyRoomCodeToClipboard';
import RoomTimer from '../RoomTimer';
import TimesUpModal from '../TimesUpModal';
import StartMatchTimer from '../StartMatchTimer';
import roomService from '../../services/room.service';
import emptyPlayer from '../../utils/emptyPlayer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectRoomCode,
  setInRoom,
  setRoomCode,
} from '../../redux/slices/roomSlice';
import {
  Loading,
  PlayerAvatar,
  PlayerContainer,
  PlayersInformations,
  Timer,
  WaitingOpponentActions,
  WaitingOpponentContainer,
} from './styles';
import { useTranslation } from 'react-i18next';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';
import { useBeforeunload } from 'react-beforeunload';
import gameService from '../../services/game.service';
import { AlertContainer } from '../AlertModal/styles';

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const roomCode = useAppSelector(selectRoomCode);
  const [timesUp, setTimesUp] = useState(false);

  const { playerTwoData } = useContext(GameContext);

  const { children, onClose, ...other } = props;
  const doesPlayerTwoExists = !!playerTwoData.name;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '22px',
        height: '70px',
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <>
          <IconButton
            aria-label='sair'
            onClick={onClose}
            disabled={doesPlayerTwoExists}
            sx={{
              position: 'absolute',
              left: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <IoMdArrowBack size={30} />
          </IconButton>
          {roomCode && !doesPlayerTwoExists && (
            <Timer
              style={{
                fontSize: '16px',
              }}
              aria-label='tempo limite'
            >
              <RoomTimer timesUp={timesUp} setTimesUp={setTimesUp} />
            </Timer>
          )}
        </>
      ) : null}

      {timesUp && <TimesUpModal setTimesUp={setTimesUp} />}
    </DialogTitle>
  );
}

interface WaitingOpponentProps {
  opponentHasQuit: boolean;
  handleQuitGame: () => void;
}

function WaitingOpponent({
  opponentHasQuit,
  handleQuitGame,
}: WaitingOpponentProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const roomCode = useAppSelector(selectRoomCode);
  const isVolumeOn = useAppSelector(selectVolumeConfig);

  const {
    playerOneData,
    playerTwoData,
    setPlayerOneData,
    setPlayerTwoData,
    isGameStarted,
  } = useContext(GameContext);

  useBeforeunload(() => {
    if (socketService.socket) gameService.quitGame(socketService.socket);
  });

  const setPlayerData = async () => {
    if (!socketService.socket) return;
    setPlayerOneData({ name: socketService.socket.id });
  };

  const handlePlayerData = async () => {
    if (!socketService.socket) return;

    roomService
      .fetchPlayers(socketService.socket, (opponent: string) => {
        setPlayerTwoData({ name: opponent });

        soundPlay(isVolumeOn, soundsData.joinRoom);
      })
      .catch((err) => alert(err));
  };

  const leaveRoom = () => {
    if (!socketService.socket) return null;

    roomService.leaveRoom(socketService.socket);

    if (roomCode) dispatch(setRoomCode(''));
    dispatch(setInRoom(false));
    setPlayerOneData(emptyPlayer);
  };

  useEffect(() => {
    if (!playerOneData.name) setPlayerData();
    handleQuitGame();
    handlePlayerData();

    return () => {
      if (socketService.socket) {
        socketService.socket.removeAllListeners('on_quit_game');
      }
    };
  }, []);

  const doesPlayerTwoExists = !!playerTwoData.name;

  return (
    <AlertContainer
      open={!isGameStarted}
      sx={{ left: '30px !important' }}
      hideBackdrop
      disableScrollLock
      disableEnforceFocus
      disableAutoFocus
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <WaitingOpponentContainer>
        <BootstrapDialogTitle id='customized-dialog-title' onClose={leaveRoom}>
          {doesPlayerTwoExists
            ? t('Iniciando partida')
            : t(`${roomCode ? '' : 'Procurando'}`)}
        </BootstrapDialogTitle>

        <PlayersInformations>
          <PlayerContainer>
            <PlayerAvatar alt={playerOneData?.name}>
              {playerOneData.name.split('')[0]}
            </PlayerAvatar>

            <p>{playerOneData.name.split('').slice(0, 6)}</p>
          </PlayerContainer>

          {!opponentHasQuit &&
            (doesPlayerTwoExists ? <StartMatchTimer /> : <Loading />)}

          <PlayerContainer>
            <PlayerAvatar alt={playerTwoData?.name}>
              {playerTwoData.name.split('')[0]}
            </PlayerAvatar>

            <p>{playerTwoData.name.split('').slice(0, 6)}</p>
          </PlayerContainer>
        </PlayersInformations>

        <WaitingOpponentActions sx={{ justifyContent: 'center' }}>
          {roomCode && !doesPlayerTwoExists && (
            <>
              <p style={{ cursor: 'default' }}>{t('Código da sala')}</p>
              <Button
                aria-label={`${t('copiar código da sala')}`}
                size='small'
                sx={{ fontSize: '20px' }}
                onClick={() => copyRoomCodeToClipboard(roomCode)}
                startIcon={<FiCopy />}
              >
                {roomCode}
              </Button>
            </>
          )}
        </WaitingOpponentActions>
      </WaitingOpponentContainer>
    </AlertContainer>
  );
}

export default WaitingOpponent;
