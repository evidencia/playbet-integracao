import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import styled from 'styled-components';
import { device } from '../../assets/device';

export const GameResultContainer = styled(Box)`
  width: fit-content;
  height: 360px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;

  @media ${device.mobileM} {
    width: 280px;
  }

  @media ${device.tablet} {
    width: 380px;
  }
`;

export const GameResultText = styled(DialogTitle)`
  text-align: center;
  cursor: default;
`;

export const ResultContainer = styled(DialogContent)`
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
`;

export const GameBetResult = styled(DialogContentText)`
  cursor: default;
  font-weight: bold;
`;

export const PlayerBalanceContainer = styled(DialogContent)`
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

export const GameResultButtons = styled(DialogActions)`
  padding: 20px;
`;
