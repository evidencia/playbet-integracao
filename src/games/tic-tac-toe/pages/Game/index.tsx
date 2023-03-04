import { useContext, useEffect, useState } from 'react';
import Board from '../../components/Board';
import JoinRoom from '../../components/JoinRoom';
import GameContext from '../../contexts/GameContext';
import GameHeader from '../../components/GameHeader';
import { GameContainer } from './styles';
import WaitingOpponent from '../../components/WaitingOpponent';
import gameService from '../../services/game.service';
import socketService from '../../services/socket.service';
import { IPlayMatrix } from '../../interfaces/IPlayMatrix';
import BottomBar from '../../components/BottomBar';
import AlertModal from '../../components/AlertModal';
import emptyPlayer from '../../utils/emptyPlayer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsInRoom, setInRoom } from '../../redux/slices/roomSlice';
import {
  setPlayerOneEmoji,
  setPlayerTwoEmoji,
  setRoundTime,
} from '../../redux/slices/matchSlice';
import { Socket } from 'socket.io-client';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';
import {
  setPlayerBalance,
  setPlayerEmojis,
} from '../../redux/slices/playerSlice';
import ResultsModal from '../../components/ResultsModal';
import { useTranslation } from 'react-i18next';

function Game() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isInRoom = useAppSelector(selectIsInRoom);
  const isVolumeOn = useAppSelector(selectVolumeConfig);
  const [gameResult, setGameResult] = useState('');
  const [alert, setAlert] = useState('');
  const [gameMatrix, setGameMatrix] = useState<IPlayMatrix>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const {
    isPlayerTurn,
    isGameStarted,
    setGameStarted,
    setPlayerSymbol,
    setPlayerTurn,
    setBetValue,
    setHadRematch,
    setQuitGame,
    setPlayerOneData,
    setPlayerTwoData,
  } = useContext(GameContext);

  const setPlayerData = () => {
    dispatch(setPlayerBalance(200));
    dispatch(setPlayerEmojis([]));
  };

  const skipPlayerTurn = () => {
    if (!socketService.socket) return;

    setPlayerTurn(!isPlayerTurn);
    gameService.updateGame(socketService.socket, gameMatrix, isPlayerTurn);
  };

  const resetBoard = () => {
    const emptyBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    setGameMatrix(emptyBoard);
  };

  const resetGame = () => {
    if (!socketService.socket) return;

    gameService.resetGame(socketService.socket, isPlayerTurn);
    gameService.resetTimer(socketService.socket);

    setGameResult('');
    resetBoard();
  };

  const endGame = () => {
    if (!socketService.socket) return;

    gameService.rematch(socketService.socket, false);
    gameService.endGame(socketService.socket);

    resetBoard();
    dispatch(setInRoom(false));
    setGameResult('');
    setPlayerSymbol('');
    setPlayerTurn(false);
    setGameStarted(false);
    setBetValue(2);
    setHadRematch(false);
    setQuitGame(false);
    setPlayerOneData(emptyPlayer);
    setPlayerTwoData(emptyPlayer);
    dispatch(setPlayerOneEmoji(null));
    dispatch(setPlayerTwoEmoji(null));
  };

  const forfeit = () => {
    if (!socketService.socket) return;

    const quit = true;
    gameService.quitGame(socketService.socket, quit);

    setAlert('');
    setGameResult('Derrota');
    dispatch(setRoundTime(15));
  };

  const setWinOnForfeit = () => {
    setAlert('');
    setGameResult('Vitória');
    dispatch(setRoundTime(15));
  };

  const resetRoundTime = () => {
    if (!socketService.socket) return;

    gameService.resetTimer(socketService.socket);
    dispatch(setRoundTime(15));
  };

  const handleGameStart = () => {
    if (!socketService.socket) return;

    console.log('foi1');
    gameService.onGameStart(socketService.socket, (options) => {
      console.log('foi');

      setGameStarted(true);
      setPlayerSymbol(options.symbol);
      setPlayerTurn(options.start);
      soundPlay(isVolumeOn, soundsData.gameStart);
    });
  };

  const handleQuitGame = () => {
    if (!socketService.socket) return;

    gameService.onQuitGame(socketService.socket, (opponentHasQuit) => {
      setAlert('O oponente saiu da partida');
      if (opponentHasQuit) {
        setGameResult('Oponente desistiu');
      } else {
        setQuitGame(true);
        setGameResult('Oponente saiu');
      }
    });
  };

  useEffect(() => {
    setPlayerData();
  }, []);

  useEffect(() => {
    if (isInRoom) handleGameStart();
  }, [isInRoom]);

  return (
    <>
      {!isInRoom && <JoinRoom />}

      {isInRoom && (
        <GameContainer>
          {alert && gameResult === 'Oponente saiu' && (
            <AlertModal
              alertText={t('O oponente saiu da partida')}
              handleClose={() => {
                endGame();
                setAlert('');
                setQuitGame(false);
              }}
            />
          )}

          {alert && (
            <AlertModal
              alertText={alert}
              setAlertText={setAlert}
              enableOnClose={alert.includes('desistir')}
              buttonText={
                alert.includes('desistir') ? 'Desistir' : 'Ver resultado'
              }
              handleClose={
                alert.includes('desistir') ? forfeit : setWinOnForfeit
              }
            />
          )}

          {gameResult && (
            <ResultsModal
              gameResult={gameResult}
              setGameResult={setGameResult}
              resetGame={resetGame}
              endGame={endGame}
            />
          )}

          {!isGameStarted ? (
            <WaitingOpponent
              opponentHasQuit={!!gameResult}
              handleQuitGame={handleQuitGame}
            />
          ) : (
            <>
              <GameHeader
                gameResult={gameResult}
                skipPlayerTurn={skipPlayerTurn}
                setAlert={setAlert}
                handleQuitGame={handleQuitGame}
              />

              <Board
                matrix={gameMatrix}
                setGameResult={setGameResult}
                setMatrix={setGameMatrix}
                resetRoundTime={resetRoundTime}
              />

              <BottomBar />
            </>
          )}
        </GameContainer>
      )}
    </>
  );
}

export default Game;
