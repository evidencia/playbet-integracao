import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface PlayerState {
  balance: number;
  emojis: number[];
}

const initialState: PlayerState = {
  balance: 0,
  emojis: [],
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setPlayerEmojis: (state, action: PayloadAction<number[]>) => {
      state.emojis = action.payload;
    },
  },
});

export const { setPlayerBalance, setPlayerEmojis } = playerSlice.actions;

export const selectBalance = (state: RootState) => state.player.balance;
export const selectPlayerEmojis = (state: RootState) => state.player.emojis;

export default playerSlice.reducer;
