export default function copyRoomCodeToClipboard(roomCode: string): void {
  navigator.clipboard.writeText(roomCode);
}
