import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { MdReplay } from 'react-icons/md';
import gameService from '../../services/game.service';
import socketService from '../../services/socket.service';

interface RematchButtonProps {
  rematch: boolean;
  setRematch: (rematch: boolean) => void;
  opponentHasQuit: boolean;
}

function RematchButton({
  rematch,
  setRematch,
  opponentHasQuit,
}: RematchButtonProps) {
  const { t } = useTranslation();

  const rematchPlayer = () => {
    if (!socketService.socket) return null;

    gameService.rematch(socketService.socket, true);
    setRematch(true);
  };

  return (
    <LoadingButton
      loading={rematch}
      onClick={rematchPlayer}
      loadingPosition='start'
      startIcon={<MdReplay />}
      variant='outlined'
      disabled={opponentHasQuit}
    >
      {rematch ? t('Aguardando oponente') : t('Revanche')}
    </LoadingButton>
  );
}

export default RematchButton;
