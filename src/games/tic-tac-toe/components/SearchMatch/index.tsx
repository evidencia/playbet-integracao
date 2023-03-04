import { useContext, useState } from 'react';
import GameContext from '../../contexts/GameContext';
import socketService from '../../services/socket.service';
import { ReactEvent } from '../../types/ReactEvent';
import BetValueButtons from '../BetValueButtons';
import GoBackButton from '../GoBackButton';
import { ImSearch } from 'react-icons/im';
import { BsFillDoorOpenFill } from 'react-icons/bs';
import { LoadingButton } from '@mui/lab';
import { Button, TextField } from '@mui/material';
import AlertModal from '../AlertModal';
import { Socket } from 'socket.io-client';
import { BetContainer, GameRoom, JoinRoomContainer } from '../JoinRoom/styles';
import { isValidRoom } from '../../utils/isValidRoom';
import roomService from '../../services/room.service';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBalance } from '../../redux/slices/playerSlice';
import {
  selectRoomCode,
  setInRoom,
  setRoomCode,
} from '../../redux/slices/roomSlice';
import { useTranslation } from 'react-i18next';
import TurnVolumeButton from '../TurnVolumeButton';
import { VolumeButtonContainer } from '../TurnVolumeButton/styles';

function SearchMatch() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const roomCode = useAppSelector(selectRoomCode);
  const [alertText, setAlertText] = useState('');
  const [isJoining, setJoining] = useState(false);
  const playerBalance = useAppSelector(selectBalance);

  const { betValue, setBetValue } = useContext(GameContext);

  const handleRoomCodeChange = (e: ReactEvent) => {
    const value = e.target.value;
    dispatch(setRoomCode(value));
  };

  const searchRoom = async () => {
    dispatch(setRoomCode(''));

    if (playerBalance < betValue) {
      return setAlertText('Saldo insuficiente');
    }

    const socket = socketService.socket;
    if (!socket) return;

    const joined = await roomService
      .searchGameRoom(socket, betValue)
      .catch(async (err) => {
        if (err === 'No rooms available') {
          return await roomService
            .createGameRoom(socket, 'public', betValue)
            .catch((newRoomError) => setAlertText(newRoomError));
        }
        setAlertText(err);
      });

    if (joined) {
      dispatch(setInRoom(true));
    }
  };

  const getRoomInformations = async (socket: Socket) => {
    const room = await roomService
      .roomInformations(socket, roomCode)
      .catch(() => null);

    if (!isValidRoom(room)) return null;

    return room;
  };

  const showErrorAlert = (errorMessage: string) => {
    setAlertText(errorMessage);
    return null;
  };

  const validateRoom = async (socket: Socket) => {
    const room = await getRoomInformations(socket);
    if (!room) return showErrorAlert('Sala não encontrada');

    const enoughBalance = playerBalance >= room.bet;
    if (!enoughBalance) return showErrorAlert('Saldo insuficiente');

    return room;
  };

  const joinRoom = async () => {
    const socket = socketService.socket;
    if (!socket) return;

    const room = await validateRoom(socket);
    if (!room) return;

    setBetValue(room.bet);

    setJoining(true);
    const joined = await roomService.joinRoom(socket, roomCode).catch((err) => {
      setAlertText(err);
    });

    if (joined) {
      dispatch(setInRoom(true));
    }

    setJoining(false);
  };

  return (
    <>
      {alertText && (
        <AlertModal
          alertText={alertText}
          enableOnClose
          setAlertText={setAlertText}
          handleClose={() => setAlertText('')}
        />
      )}

      <GameRoom>
        <GoBackButton />

        <VolumeButtonContainer style={{ top: 8 }}>
          <TurnVolumeButton />
        </VolumeButtonContainer>

        <BetContainer>
          <BetValueButtons />
          <Button
            disableRipple
            variant='outlined'
            fullWidth
            onClick={searchRoom}
            startIcon={<ImSearch size={20} />}
          >
            {t('Procurar partida')}
          </Button>
        </BetContainer>

        <JoinRoomContainer>
          <TextField
            label={`${t('Código da sala')}`}
            variant='outlined'
            onChange={handleRoomCodeChange}
            inputProps={{ maxLength: 6 }}
            style={{ flexGrow: '1' }}
            size='small'
          />

          <LoadingButton
            disableRipple
            variant='contained'
            disabled={roomCode.length !== 6}
            onClick={joinRoom}
            loading={isJoining}
            startIcon={<BsFillDoorOpenFill size={20} />}
          >
            {t('Entrar')}
          </LoadingButton>
        </JoinRoomContainer>
      </GameRoom>
    </>
  );
}

export default SearchMatch;
