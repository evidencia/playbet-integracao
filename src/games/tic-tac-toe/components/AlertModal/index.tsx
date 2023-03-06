import { forwardRef, ReactElement, Ref } from 'react';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from '@mui/material';
import { AlertContainer, ConfirmButton } from './styles';
import InsufficientBalanceModal from '../InsufficientBalanceModal';
import { useTranslation } from 'react-i18next';

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
    <AlertContainer
      onClose={closeOutsideArea}
      open={!!alertText}
      keepMounted
      sx={{ zIndex: 999 }}
      hideBackdrop
      disableScrollLock
      disableEnforceFocus
      disableAutoFocus
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
    </AlertContainer>
  );
}

export default AlertModal;
