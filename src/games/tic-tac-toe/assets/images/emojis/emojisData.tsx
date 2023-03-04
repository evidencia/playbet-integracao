import angry from './angry.png';
import crying from './crying.png';
import kiss from './kiss.png';
import laughing from './laughing.png';
import smug from './smug.png';
import zany from './zany.png';
import donkey from './donkey.png';
import chicken from './chicken.png';

import { Emoji } from '../../../types/Emoji';

import laughingGif from './laughing.gif';
import cryingGif from './crying.gif';
import smugGif from './smug.gif';
import angryGif from './angry.gif';
import donkeyGif from './donkey.gif';
import chickenGif from './chicken.gif';
import kissGif from './kiss.gif';
import zanyGif from './zany.gif';

import DonkeySound from '../../sounds/donkey.mp3';
import ChickenSound from '../../sounds/chicken.mp3';
import KissSound from '../../sounds/kiss.mp3';
import ZanySound from '../../sounds/zany.mp3';
import SmugSound from '../../sounds/smug.mp3';
import CryingSound from '../../sounds/crying.mp3';
import AngrySound from '../../sounds/angry.mp3';
import LaughingSound from '../../sounds/laughing.mp3';

import { GifEmoji } from './styles';

export interface IEmojisData {
  free: Emoji[];
  paid: Emoji[];
}

const emojisData: IEmojisData = {
  free: [
    {
      id: 1,
      name: 'angry',
      icon: angry,
      gif: (
        <GifEmoji
          src={angryGif}
          alt='angry'
          style={{
            top: '34px',
            transform: 'scale(2.5)',
          }}
        />
      ),
      sound: AngrySound,
    },
    {
      id: 2,
      name: 'crying',
      icon: crying,
      gif: (
        <GifEmoji
          src={cryingGif}
          alt='crying'
          style={{
            top: '34px',
            transform: 'scale(2.5)',
          }}
        />
      ),
      sound: CryingSound,
    },
    {
      id: 3,
      name: 'laughing',
      icon: laughing,
      gif: (
        <GifEmoji
          src={laughingGif}
          alt='laughing'
          style={{
            top: '34px',
            transform: 'scale(2.5)',
          }}
        />
      ),
      sound: LaughingSound,
    },
    {
      id: 4,
      name: 'smug',
      icon: smug,
      gif: (
        <GifEmoji
          src={smugGif}
          alt='smug'
          style={{
            top: '34px',
            transform: 'scale(2.5)',
          }}
        />
      ),
      sound: SmugSound,
    },
  ],
  paid: [
    {
      id: 5,
      name: 'chicken',
      icon: chicken,
      gif: (
        <GifEmoji
          style={{ top: '35px', transform: 'scale(2.5)' }}
          src={chickenGif}
          alt='chicken'
        />
      ),
      sound: ChickenSound,
    },
    {
      id: 6,
      name: 'donkey',
      icon: donkey,
      gif: <GifEmoji src={donkeyGif} alt='donkey' />,
      sound: DonkeySound,
    },
    {
      id: 7,
      name: 'kiss',
      icon: kiss,
      gif: (
        <GifEmoji
          src={kissGif}
          alt='kiss'
          style={{
            transform: 'scale(2.5)',
          }}
        />
      ),
      sound: KissSound,
    },
    {
      id: 8,
      name: 'zany',
      icon: zany,
      gif: (
        <GifEmoji
          src={zanyGif}
          alt='zany'
          style={{
            top: '33px',
            transform: 'scale(2.5)',
          }}
        />
      ),
      sound: ZanySound,
    },
  ],
};

export default emojisData;
