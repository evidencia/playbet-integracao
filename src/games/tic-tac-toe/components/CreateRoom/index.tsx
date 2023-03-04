import { useContext, useState } from 'react';
import GoBackButton from '../GoBackButton';
import BetValueButtons from '../BetValueButtons';
import socketService from '../../services/socket.service';
import GameContext from '../../contexts/GameContext';
import { LoadingButton } from '@mui/lab';
import AlertModal from '../AlertModal';
import { IoMdCreate } from 'react-icons/io';
import { BetContainer, GameRoom } from '../JoinRoom/styles';
import roomService from '../../services/room.service';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectBalance } from '../../redux/slices/playerSlice';
import { setInRoom, setRoomCode } from '../../redux/slices/roomSlice';
import { useTranslation } from 'react-i18next';
import { VolumeButtonContainer } from '../TurnVolumeButton/styles';
import TurnVolumeButton from '../TurnVolumeButton';

function CreateRoom() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isCreating, setCreating] = useState(false);
  const [alertText, setAlertText] = useState('');
  const playerBalance = useAppSelector(selectBalance);

  const { betValue } = useContext(GameContext);

  const createRoom = async () => {
    if (playerBalance < betValue) {
      return setAlertText('Saldo insuficiente');
    }

    if (!socketService.socket) return;

    setCreating(true);
    const created = await roomService
      .createGameRoom(socketService.socket, 'private', betValue)
      .catch((err) => alert(err));

    if (created) {
      const roomCode = String(created);
      dispatch(setRoomCode(roomCode));

      dispatch(setInRoom(true));
    }

    setCreating(false);
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
        <VolumeButtonContainer style={{ top: 8 }}>
          <TurnVolumeButton />
        </VolumeButtonContainer>

        <GoBackButton />
        <BetContainer>
          <BetValueButtons />
          <LoadingButton
            disableRipple
            loading={isCreating}
            variant='outlined'
            onClick={createRoom}
            fullWidth
            startIcon={<IoMdCreate size={20} />}
          >
            {t('Criar')}
          </LoadingButton>
        </BetContainer>
      </GameRoom>
    </>
  );
}

export default CreateRoom;
