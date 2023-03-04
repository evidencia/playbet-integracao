import { useContext } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import GameContext from '../../contexts/GameContext';

interface RoomTimerProps {
  timesUp: boolean;
  setTimesUp: (timesUp: boolean) => void;
}

function RoomTimer({ timesUp, setTimesUp }: RoomTimerProps) {
  const { isGameStarted } = useContext(GameContext);

  const FIVE_MINUTES = 300000;

  const formatTimer = (minutes: number, seconds: number) => {
    return `0${minutes}:${
      String(seconds).length === 2 ? seconds : `0${seconds}`
    }`;
  }

  const renderer = ({ minutes, seconds }: CountdownRenderProps) => {
    if (!isGameStarted) {
      return (
        <>
          {timesUp ? (
            <span>00:00</span>
          ) : (
            <span>{formatTimer(minutes, seconds)}</span>
          )}
        </>
      );
    }
  };

  return (
    <Countdown
      date={Date.now() + FIVE_MINUTES}
      onComplete={() => setTimesUp(true)}
      renderer={renderer}
    />
  );
}

export default RoomTimer;
