import { Box } from '@mui/material';
import styled from 'styled-components';

export const BoardContainer = styled.div`
  background-color: #121212;
  border-radius: 8px;
  padding: 12px;
  width: 285px;
  height: 285px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  position: absolute;
`;

export const GameRoomCode = styled.span`
  z-index: 100;
  font-size: 24px;
`;

export const RowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface ICellProps {
  isGameStarted: boolean;
  isPlayerTurn: boolean;
  isSelected: boolean;
}

export const Cell = styled.div<ICellProps>`
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 6px;
  cursor: ${({ isGameStarted, isPlayerTurn, isSelected }) => {
    const cursorCondition = !isGameStarted || !isPlayerTurn || isSelected;
    return cursorCondition ? 'default' : 'pointer';
  }};
`;

export const RoomInformationsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;
