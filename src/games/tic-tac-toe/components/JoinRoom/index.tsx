import { Button, IconButton } from '@mui/material';
import { BiJoystickAlt } from 'react-icons/bi';
import { IoMdCreate } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectIsInRoom,
  selectRoomType,
  setRoomType,
} from '../../redux/slices/roomSlice';
import CreateRoom from '../CreateRoom';
import SearchMatch from '../SearchMatch';
import { useTranslation } from 'react-i18next';
import { MenuContainer, SettingsButtonContainer } from './styles';
import { RoomTypes } from '../../types/RoomTypes';
import { BsQuestionCircle } from 'react-icons/bs';
import { useState } from 'react';
import RulesModal from '../RulesModal';
import TurnVolumeButton from '../TurnVolumeButton';
import Logo from '../../assets/svg/logo.svg';

function JoinRoom() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isInRoom = useAppSelector(selectIsInRoom);
  const roomType = useAppSelector(selectRoomType);
  const [showRules, setShowRules] = useState(false);

  const handleRoomType = (value: RoomTypes) => {
    dispatch(setRoomType(value));
  };

  return (
    <MenuContainer>
      {!isInRoom && !roomType ? (
        <>
          <div>
            <img src={Logo} alt='Logo' style={{ width: 200, height: 200 }} />
          </div>

          <SettingsButtonContainer style={{ gap: 12 }}>
            <TurnVolumeButton />
            <IconButton
              aria-label={`${t('regras do jogo')}`}
              color='primary'
              onClick={() => setShowRules(!showRules)}
            >
              <BsQuestionCircle size={28} />
            </IconButton>
          </SettingsButtonContainer>

          <Button
            disableRipple
            sx={{ width: 280 }}
            variant='outlined'
            onClick={() => handleRoomType('search')}
            startIcon={<BiJoystickAlt size={20} />}
          >
            {t('Jogar')}
          </Button>

          {showRules && <RulesModal open={showRules} setOpen={setShowRules} />}

          <Button
            disableRipple
            sx={{ width: 280 }}
            variant='outlined'
            onClick={() => handleRoomType('create')}
            startIcon={<IoMdCreate size={20} />}
          >
            {t('Criar sala')}
          </Button>
        </>
      ) : roomType === 'search' ? (
        <SearchMatch />
      ) : (
        <CreateRoom />
      )}
    </MenuContainer>
  );
}

export default JoinRoom;
