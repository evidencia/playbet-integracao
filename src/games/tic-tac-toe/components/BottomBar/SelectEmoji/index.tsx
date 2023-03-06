import { ReactElement, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Emoji } from '../../../types/Emoji';
import { LockedEmoji } from '../styles';
import { useAppSelector } from '../../../redux/hooks';
import { selectPlayerEmojis } from '../../../redux/slices/playerSlice';

interface SelectEmojiProps {
  emojis: Emoji[];
  emojiTimeout: boolean;
  sendEmoji: (id: number) => void;
  paidEmojis: boolean;
  setBuyEmoji: (emoji: number) => void;
  icon: ReactElement;
}

function SelectEmoji({
  emojis,
  emojiTimeout,
  sendEmoji,
  paidEmojis,
  setBuyEmoji,
  icon,
}: SelectEmojiProps) {
  const playerEmojis = useAppSelector(selectPlayerEmojis);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmojiClick = (emojiId: number) => {
    const doesPlayerHaveEmoji = playerEmojis.includes(emojiId);

    if (!paidEmojis || doesPlayerHaveEmoji) {
      sendEmoji(emojiId);
      return;
    }

    setBuyEmoji(emojiId);
  };

  return (
    <Box>
      <Menu
        disableScrollLock
        id='basic-menu'
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { display: 'flex', height: '70px', padding: '8px' },
        }}
      >
        {emojis.map((emoji) => (
          <MenuItem
            key={emoji.id}
            onClick={() => {
              handleEmojiClick(emoji.id);
              handleClose();
            }}
          >
            <Box position='relative'>
              {paidEmojis && !playerEmojis.includes(emoji.id) && (
                <LockedEmoji size={18} />
              )}
              <img src={emoji.icon} alt={emoji.name} />
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <IconButton
        aria-label='emojis'
        aria-controls={open ? 'emojis list' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disabled={emojiTimeout}
        sx={{ backgroundColor: grey[900] }}
        color='primary'
      >
        {icon}
      </IconButton>
    </Box>
  );
}

export default SelectEmoji;
