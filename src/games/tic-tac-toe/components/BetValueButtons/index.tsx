import { IconButton } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { HiPlus, HiMinus } from 'react-icons/hi';
import GameContext from '../../contexts/GameContext';
import formatToBRL from '../../utils/formatToBRL';
import { BetValueContainer, Bet, SelectBet } from './styles';

function BetValueButtons() {
  const { t } = useTranslation();
  const { betValue, setBetValue } = useContext(GameContext);

  const hasMaximumValue = (buttonMethod: '+' | '-') => {
    const maximumBetValue = 5000;
    const minimumBetValue = 2;

    if (buttonMethod === '+') {
      return betValue === maximumBetValue;
    } else {
      return betValue === minimumBetValue;
    }
  };

  const handleBetValue = (operation: string) => {
    const values = [2, 5, 10, 20, 100, 500, 5000];

    const currentValue = values.findIndex((bet) => bet === betValue);

    if (operation === 'increase') {
      setBetValue(values[currentValue + 1]);
    } else {
      setBetValue(values[currentValue - 1]);
    }
  };

  return (
    <BetValueContainer>
      <h2>{t('Apostar')}</h2>
      <SelectBet>
        <IconButton
          aria-label={`${t('diminuir aposta')}`}
          color='primary'
          disabled={hasMaximumValue('-')}
          onClick={() => handleBetValue('decrease')}
        >
          <HiMinus />
        </IconButton>
        <Bet>{formatToBRL(betValue)}</Bet>
        <IconButton
          aria-label={`${t('aumentar aposta')}`}
          color='primary'
          disabled={hasMaximumValue('+')}
          onClick={() => handleBetValue('increase')}
        >
          <HiPlus />
        </IconButton>
      </SelectBet>
    </BetValueContainer>
  );
}

export default BetValueButtons;
