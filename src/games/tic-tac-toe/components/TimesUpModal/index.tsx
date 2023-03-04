import { forwardRef, ReactElement, Ref } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { AlertButton, ConfirmButton } from '../AlertModal/styles';
import socketService from '../../services/socket.service';
import gameService from '../../services/game.service';
import { useAppDispatch } from '../../redux/hooks';
import { setInRoom } from '../../redux/slices/roomSlice';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface TimesUpModalProps {
  setTimesUp: (timesUp: boolean) => void;
}

function TimesUpModal({ setTimesUp }: TimesUpModalProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (!socketService.socket) return null;

    const quit = true;
    gameService.quitGame(socketService.socket, quit);
    setTimesUp(false);
    dispatch(setInRoom(false));
  };

  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle style={{ cursor: 'default' }}>
          {t('Sala expirada')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('Sua sala foi fechada devido a ausência de um oponente.')}
          </DialogContentText>
        </DialogContent>
        <AlertButton style={{ padding: 0 }}>
          <ConfirmButton sx={{ padding: '10px' }} onClick={handleClose}>
            OK
          </ConfirmButton>
        </AlertButton>
      </Dialog>
    </div>
  );
}

export default TimesUpModal;
