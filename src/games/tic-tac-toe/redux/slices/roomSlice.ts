import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomTypes } from '../../types/RoomTypes';
import { RootState } from '../store';

interface RoomState {
  isInRoom: boolean;
  roomCode: string;
  roomType: RoomTypes;
}

const initialState: RoomState = {
  isInRoom: false,
  roomCode: '',
  roomType: '',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setInRoom: (state, action: PayloadAction<boolean>) => {
      state.isInRoom = action.payload;
    },
    setRoomCode: (state, action: PayloadAction<string>) => {
      state.roomCode = action.payload;
    },
    setRoomType: (state, action: PayloadAction<RoomTypes>) => {
      state.roomType = action.payload || '';
    },
  },
});

export const { setInRoom, setRoomCode, setRoomType } = roomSlice.actions;

export const selectIsInRoom = (state: RootState) => state.room.isInRoom;
export const selectRoomCode = (state: RootState) => state.room.roomCode;
export const selectRoomType = (state: RootState) => state.room.roomType;

export default roomSlice.reducer;
