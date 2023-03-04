import { Box, IconButton, SvgIcon } from '@mui/material';
import { grey } from '@mui/material/colors';
import ProgressBar from '@ramonak/react-progress-bar';
import styled from 'styled-components';
import { device } from '../../assets/device';

export const ProfilePicture = styled(Box)`
  height: 100px;
  width: 100px;
`;

export const GameHeaderContainer = styled(Box)`
  align-items: center;
  background-color: ${grey[900]};
  display: flex;
  justify-content: center;
  padding: 12px;
  height: 90px;
  gap: 12px;
  max-width: 700px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 2;

  @media ${device.tablet} {
    margin-top: 0;
    top: 0;
  }
`;

interface PlayerContainerProps {
  isPlayerTurn: boolean;
}

export const PlayerContainer = styled.div<PlayerContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 12px;
  height: 100%;
  width: 125px;
  justify-content: space-evenly;
  gap: 6px;
  position: relative;
  background-color: ${({ isPlayerTurn }) =>
    isPlayerTurn ? `#121212` : `#121212`};
`;

export const PlayerName = styled.p``;

export const PlayerNameAndSymbol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const TimerBar = styled(ProgressBar)`
  position: absolute;
`;

export const PlayerEmoji = styled.div`
  position: absolute;
  top: 38px;
  z-index: 3;
  overflow: hidden;
  height: 70px;
`;

export const EmojiContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Emoji = styled.img`
  position: absolute;
  margin-top: 10px;
`;

export const LeaveButton = styled(IconButton)`
  left: 8px;
  z-index: 3;
`;
