import { Button, Dialog, DialogActions } from '@mui/material';
import styled from 'styled-components';

export const AlertButton = styled(DialogActions)`
  justify-content: center;
`;

export const ConfirmButton = styled(Button)`
  flex-grow: 1;
  min-width: 50%;
`;

export const AlertContainer = styled(Dialog)`
  top: 15vh !important;
  position: absolute !important;
  height: 600px !important;
  right: calc(1vw + 5px) !important;
  margin: 0 auto !important;
`;
