import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdArrowBack } from 'react-icons/io';
import GameContext from '../../contexts/GameContext';
import { useAppDispatch } from '../../redux/hooks';
import { setRoomType } from '../../redux/slices/roomSlice';

function GoBackButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { setBetValue } = useContext(GameContext);

  const handleClick = () => {
    dispatch(setRoomType(''));
    setBetValue(2);
  };

  return (
    <IconButton
      color='primary'
      sx={{ position: 'absolute', top: '8px', left: '8px' }}
      aria-label={`${t('voltar')}`}
      onClick={handleClick}
    >
      <IoMdArrowBack size='28' />
    </IconButton>
  );
}

export default GoBackButton;
