import { Howl } from 'howler';

export default function soundPlay(
  isVolumeOn: boolean,
  src: string,
  options?: any
) {
  if (isVolumeOn) {
    const sound = new Howl({ src, volume: 0.1, ...options });
    sound.play();
  }
}
