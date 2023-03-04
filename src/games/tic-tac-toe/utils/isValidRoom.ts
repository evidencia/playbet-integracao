import IGameRoom from '../interfaces/IGameRoom';

export const isValidRoom = (room: any): room is IGameRoom => {
  return (
    typeof room === 'object' &&
    room !== null &&
    'id' in room &&
    'bet' in room &&
    'private' in room
  );
};
