import { Button } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import GameContext from '../../contexts/GameContext';

interface QuitGameButtonProps {
  buttonText: string;
  endGame: () => void;
}

function QuitGameButton({ buttonText, endGame }: QuitGameButtonProps) {
  const { t } = useTranslation();
  const { hadRematch } = useContext(GameContext);

  return (
    <>
      {buttonText === 'Menu principal' ? (
        <Button onClick={endGame}>{t(buttonText)}</Button>
      ) : (
        hadRematch && <Button onClick={endGame}>{t(buttonText)}</Button>
      )}
    </>
  );
}

export default QuitGameButton;
