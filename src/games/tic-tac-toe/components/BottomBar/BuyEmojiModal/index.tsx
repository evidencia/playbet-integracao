import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectPlayerEmojis,
  setPlayerEmojis,
} from '../../../redux/slices/playerSlice';
import requests from '../../../../../services/requests';
import { getUserInStorage } from '../../../../../utils/localStorage';
import { IUserInStorage } from '../../../../../interfaces/IUser';

interface BuyEmojiModalProps {
  open: boolean;
  setBuyEmoji: (emoji: number) => void;
  emojiId: number;
}

function BuyEmojiModal({ open, setBuyEmoji, emojiId }: BuyEmojiModalProps) {
  const dispatch = useAppDispatch();
  const playerEmojis = useAppSelector(selectPlayerEmojis);
  const { t } = useTranslation();

  const handleClose = () => {
    setBuyEmoji(0);
  };

  const buy = async () => {
    const user = getUserInStorage() as IUserInStorage;
    await requests.post.emojis.addToUser({ emojiId, userId: user.id });

    dispatch(setPlayerEmojis([...playerEmojis, emojiId]));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {t('Deseja desbloquear esse emoji?')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {t(
            'Esse emoji é pago, clicando em comprar uma nova aba no seu navegador irá se abrir te levando à página de compra'
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('Cancelar')}</Button>
        <Button onClick={buy} autoFocus>
          {t('Comprar')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BuyEmojiModal;
