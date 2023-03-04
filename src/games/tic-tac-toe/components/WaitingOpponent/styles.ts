import { Avatar, Box, DialogActions, DialogContent } from '@mui/material';
import styled from 'styled-components';
import { device } from '../../assets/device';

export const Loading = styled.span`
  height: 48px;
  width: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-bottom: 26px;

  @media ${device.mobileL} {
    margin-bottom: 0;
  }

  @keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
`;

export const WaitingOpponentContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 365px;
  text-align: center;
  width: 80vw;

  @media ${device.tablet} {
    width: 600px;
  }
`;

export const WaitingOpponentActions = styled(DialogActions)`
  flex-direction: column;
  height: 80px;
`;

export const PlayerContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 105px;

  @media ${device.tablet} {
    height: 150px;
  }
`;

export const PlayersInformations = styled(DialogContent)`
  display: flex;
  align-items: center;
  padding: 20px 10px !important;
  justify-content: space-between;
  width: 100%;
  
  @media ${device.mobileM} {
    padding: 20px 24px !important;
  }

  @media ${device.tablet} {
    justify-content: space-between;
  }
`;

export const PlayerAvatar = styled(Avatar)`
  height: 80px !important;
  width: 80px !important;

  @media ${device.mobileL} {
    height: 100px !important;
    width: 100px !important;
  }

  @media ${device.tablet} {
    height: 120px !important;
    width: 120px !important;
  }
`;

export const Timer = styled.p`
  position: absolute;
  right: 8px;
  padding: 8px;
  color: white;
  cursor: default;
`;
