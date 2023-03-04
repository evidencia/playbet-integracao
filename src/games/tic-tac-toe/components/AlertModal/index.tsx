import { forwardRef, ReactElement, Ref } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ConfirmButton } from './styles';
import InsufficientBalanceModal from '../InsufficientBalanceModal';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface AlertModalProps {
  alertText: string;
  setAlertText?: (text: string) => void;
  buttonText?: string;
  handleClose: () => void;
  enableOnClose?: boolean;
}

function AlertModal({
  alertText,
  setAlertText,
  handleClose,
  buttonText,
  enableOnClose,
}: AlertModalProps) {
  const { t } = useTranslation();

  const closeOutsideArea = () => {
    if (enableOnClose && setAlertText) {
      setAlertText('');
    }
  };

  return (
    <Dialog
      onClose={closeOutsideArea}
      open={!!alertText}
      TransitionComponent={Transition}
      keepMounted
      sx={{ zIndex: 9999 }}
      aria-describedby='alert-dialog-slide-description'
    >
      {alertText === 'Saldo insuficiente' ? (
        <InsufficientBalanceModal handleClose={handleClose} />
      ) : (
        <Box sx={{ padding: '10px 0', minWidth: '256px' }}>
          <DialogContent>
            <DialogContentText
              style={{
                cursor: 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              {t(alertText)}
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            {setAlertText && buttonText === 'Desistir' && (
              <ConfirmButton
                variant='outlined'
                onClick={() => setAlertText('')}
              >
                {t('Cancelar')}
              </ConfirmButton>
            )}
            <ConfirmButton
              color={buttonText === 'Desistir' ? 'error' : 'primary'}
              variant='outlined'
              onClick={handleClose}
            >
              {buttonText ? t(buttonText) : 'OK'}
            </ConfirmButton>
          </DialogActions>
        </Box>
      )}
    </Dialog>
  );
}

export default AlertModal;
