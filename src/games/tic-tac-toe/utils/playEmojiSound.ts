import emojisData from "../assets/images/emojis/emojisData";
import getEmojiType from "./getEmojiType";
import soundPlay from "./soundPlay";

export default function playEmojiSound(isVolumeOn: boolean, emojiId: number) {
  const emoji = emojisData[getEmojiType(emojiId)].find(
    ({ id }) => emojiId === id
  );

  if (emoji && emoji.sound) {
    soundPlay(isVolumeOn, emoji.sound, { volume: 0.1 });
  }
}
