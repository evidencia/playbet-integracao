import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import roomReducer from './slices/roomSlice';
import matchReducer from './slices/matchSlice';
import gameReducer from './slices/gameSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    room: roomReducer,
    match: matchReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
