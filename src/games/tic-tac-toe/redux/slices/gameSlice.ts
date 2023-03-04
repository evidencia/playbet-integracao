import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface GameState {
  volume: boolean;
}

const initialState: GameState = {
  volume: true,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    enableGameVolume: (state, action: PayloadAction<boolean>) => {
      state.volume = action.payload;
    },
  },
});

export const { enableGameVolume } = gameSlice.actions;

export const selectVolumeConfig = (state: RootState) => state.game.volume;

export default gameSlice.reducer;
