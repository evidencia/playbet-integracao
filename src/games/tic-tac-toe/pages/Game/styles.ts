import { grey } from '@mui/material/colors';
import styled from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: ${grey[900]};
  flex-direction: column;
  gap: 2vmin;
  height: 590px;
  max-width: 700px;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid rgba(235, 235, 235, 0.1);
  overflow: hidden;
`;
