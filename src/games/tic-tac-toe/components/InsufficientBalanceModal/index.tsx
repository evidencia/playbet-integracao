import {
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface InsufficientBalanceModalProps {
  handleClose: () => void;
}

function InsufficientBalanceModal({
  handleClose,
}: InsufficientBalanceModalProps) {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle style={{ cursor: 'default' }}>
        {t('Saldo insuficiente')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText style={{ cursor: 'default' }}>
          {t('Você não possui saldo o suficiente para fazer a aposta.')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Cancelar')}</Button>
        <Button onClick={handleClose}>{t('Adicionar saldo')}</Button>
      </DialogActions>
    </>
  );
}

export default InsufficientBalanceModal;
