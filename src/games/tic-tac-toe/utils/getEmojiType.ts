export default function getEmojiType(id: number) {
  return id <= 4 ? 'free' : 'paid';
}
