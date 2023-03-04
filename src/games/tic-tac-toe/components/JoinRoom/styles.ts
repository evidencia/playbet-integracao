import { Box } from '@mui/material';
import { device } from '../../assets/device';
import styled from 'styled-components';

export const GameRoom = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  max-height: 90vh;
  gap: 100px;
  justify-content: center;
  align-items: center;
`;

export const BetContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  gap: 10px;

  @media ${device.tablet} {
    width: 320px;
  }
`;

export const MenuContainer = styled(Box)`
  border: 1px solid rgba(235, 235, 235, 0.1);
  min-height: 90vh;
  max-height: 90vh;
  max-width: 700px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const SettingsButtonContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  z-index: 3;
`;

export const JoinRoomContainer = styled(Box)`
  display: flex;
  width: 280px;
  flex-direction: column;
  gap: 10px;

  @media ${device.tablet} {
    flex-direction: row;
    width: 320px;
  }
`;
