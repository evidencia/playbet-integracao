import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type PlayerEmoji = number | null;

interface MatchState {
  playerOneEmoji: PlayerEmoji;
  playerTwoEmoji: PlayerEmoji;
  roundTime: number;
}

const initialState: MatchState = {
  playerOneEmoji: null,
  playerTwoEmoji: null,
  roundTime: 15,
};

export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setPlayerOneEmoji: (state, action: PayloadAction<PlayerEmoji>) => {
      state.playerOneEmoji = action.payload;
    },
    setPlayerTwoEmoji: (state, action: PayloadAction<PlayerEmoji>) => {
      state.playerTwoEmoji = action.payload;
    },
    setRoundTime: (state, action: PayloadAction<number>) => {
      state.roundTime = action.payload;
    },
  },
});

export const { setPlayerOneEmoji, setPlayerTwoEmoji, setRoundTime } =
  matchSlice.actions;

export const selectPlayerOneEmoji = (state: RootState) =>
  state.match.playerOneEmoji;
export const selectPlayerTwoEmoji = (state: RootState) =>
  state.match.playerTwoEmoji;
export const selectRoundTime = (state: RootState) => state.match.roundTime;

export default matchSlice.reducer;
