import { BottomNavigation, Box, IconButton } from '@mui/material';
import { FaLock } from 'react-icons/fa';
import styled from 'styled-components';

export const BottomBarContainer = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  padding: 12px;
  width: 100%;
  height: 70px;
`;

export const BottomBarActions = styled(BottomNavigation)`
  backgroundcolor: #121212;
  width: 100%;
  height: 70px;
`;

export const ActionButton = styled(IconButton)`
  width: 70px;
`;

export const LockedEmoji = styled(FaLock)`
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
`;
