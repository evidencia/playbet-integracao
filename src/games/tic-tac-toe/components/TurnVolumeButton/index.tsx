import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  enableGameVolume,
  selectVolumeConfig,
} from '../../redux/slices/gameSlice';

function TurnVolumeButton() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isVolumeOn = useAppSelector(selectVolumeConfig);

  return (
    <IconButton
      aria-label={`${t('ligar/desligar volume')}`}
      onClick={() => dispatch(enableGameVolume(!isVolumeOn))}
      color='primary'
    >
      {isVolumeOn ? <HiVolumeUp size={28} /> : <HiVolumeOff size={28} />}
    </IconButton>
  );
}

export default TurnVolumeButton;
