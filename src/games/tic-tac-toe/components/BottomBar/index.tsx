import { useState } from 'react';
import socketService from '../../services/socket.service';
import chatService from '../../services/chat.service';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setPlayerOneEmoji } from '../../redux/slices/matchSlice';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import SelectEmoji from './SelectEmoji';
import { FiStar } from 'react-icons/fi';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { BottomBarContainer } from './styles';
import BuyEmojiModal from './BuyEmojiModal';
import playEmojiSound from '../../utils/playEmojiSound';
import emojisData from '../../assets/images/emojis/emojisData';

function BottomBar() {
  const dispatch = useAppDispatch();
  const isVolumeOn = useAppSelector(selectVolumeConfig);
  const [emojiTimeout, setEmojiTimeout] = useState(false);
  const [buyEmoji, setBuyEmoji] = useState(0);

  const emojiButtonTimeout = () => {
    const FIVE_SECONDS = 5000;
    setEmojiTimeout(true);
    setTimeout(() => setEmojiTimeout(false), FIVE_SECONDS);
  };

  const removeLastEmoji = () => {
    if (!socketService.socket) return;
    chatService.sendEmoji(socketService.socket, null);
    dispatch(setPlayerOneEmoji(null));
  };

  const sendEmoji = (id: number) => {
    if (!socketService.socket) return;

    dispatch(setPlayerOneEmoji(id));
    chatService.sendEmoji(socketService.socket, id);

    playEmojiSound(isVolumeOn, id);
    soundPlay(isVolumeOn, soundsData.sendEmoji);

    const THREE_SECONDS = 3000;
    setTimeout(removeLastEmoji, THREE_SECONDS);
    emojiButtonTimeout();
  };

  return (
    <BottomBarContainer>
      <SelectEmoji
        emojis={emojisData.paid}
        emojiTimeout={emojiTimeout}
        sendEmoji={sendEmoji}
        paidEmojis
        setBuyEmoji={setBuyEmoji}
        icon={<FiStar size={28} />}
      />

      {!!buyEmoji && (
        <BuyEmojiModal
          open={!!buyEmoji}
          setBuyEmoji={setBuyEmoji}
          emojiId={buyEmoji}
        />
      )}

      <SelectEmoji
        emojis={emojisData.free}
        emojiTimeout={emojiTimeout}
        sendEmoji={sendEmoji}
        paidEmojis={false}
        setBuyEmoji={setBuyEmoji}
        icon={<MdOutlineEmojiEmotions size={28} />}
      />
    </BottomBarContainer>
  );
}

export default BottomBar;
