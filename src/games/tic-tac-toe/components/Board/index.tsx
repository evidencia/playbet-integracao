import { useContext, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';
import gameService from '../../services/game.service';
import socketService from '../../services/socket.service';
import { GameSymbol } from '../../types/GameSymbol';
import { IPlayMatrix } from '../../interfaces/IPlayMatrix';
import { Cell, BoardContainer, RowContainer } from './styles';
import { RxCircle, RxCross1 } from 'react-icons/rx';
import { grey } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setRoundTime } from '../../redux/slices/matchSlice';
import soundPlay from '../../utils/soundPlay';
import soundsData from '../../assets/sounds/soundsData';
import { selectVolumeConfig } from '../../redux/slices/gameSlice';

interface BoardProps {
  matrix: IPlayMatrix;
  setGameResult: (result: string) => void;
  setMatrix: (matrix: IPlayMatrix) => void;
  resetRoundTime: () => void;
}

function Board({
  matrix,
  setGameResult,
  setMatrix,
  resetRoundTime,
}: BoardProps) {
  const dispatch = useAppDispatch();
  const isVolumeOn = useAppSelector(selectVolumeConfig);
  const { playerSymbol, setPlayerTurn, isPlayerTurn, isGameStarted } =
    useContext(GameContext);

  const checkGameState = (matrix: IPlayMatrix) => {
    for (let i = 0; i < matrix.length; i++) {
      let row = [];
      for (let j = 0; j < matrix[i].length; j++) {
        row.push(matrix[i][j]);
      }

      if (row.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (row.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    for (let i = 0; i < matrix.length; i++) {
      let column = [];
      for (let j = 0; j < matrix[i].length; j++) {
        column.push(matrix[j][i]);
      }

      if (column.every((value) => value && value === playerSymbol)) {
        return [true, false];
      } else if (column.every((value) => value && value !== playerSymbol)) {
        return [false, true];
      }
    }

    if (matrix[1][1]) {
      if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }

      if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
        if (matrix[1][1] === playerSymbol) return [true, false];
        else return [false, true];
      }
    }

    // Check for a tie
    if (matrix.every((m) => m.every((v) => v !== null))) {
      return [true, true];
    }

    return [false, false];
  };

  const updateGameMatrix = (
    column: number,
    row: number,
    symbol: GameSymbol
  ) => {
    if (!isPlayerTurn || !socketService.socket) return;

    const newMatrix = [...matrix];

    if (newMatrix[row][column] === null || newMatrix[row][column] === 'null') {
      newMatrix[row][column] = symbol;
      setMatrix(newMatrix);
      soundPlay(isVolumeOn, soundsData.p1Click);
    }

    gameService.updateGame(socketService.socket, newMatrix, isPlayerTurn);

    const [currentPlayerWon, otherPlayerWon] = checkGameState(newMatrix);

    if (currentPlayerWon && otherPlayerWon) {
      gameService.gameWin(socketService.socket, 'Empate');
      setGameResult('Empate');
    }

    if (currentPlayerWon && !otherPlayerWon) {
      gameService.gameWin(socketService.socket, 'Derrota');
      setGameResult('Vitória');
    }

    setPlayerTurn(false);
    resetRoundTime();
  };

  const handleGameUpdate = () => {
    if (!socketService.socket) return;

    socketService.socket.removeAllListeners('on_game_update');

    gameService.onGameUpdate(socketService.socket, (gameDetails) => {
      const gameInProgress = matrix.every((m) => m.some((v) => v === null));
      if (gameInProgress) setPlayerTurn(gameDetails.isPlayerTurn);

      soundPlay(isVolumeOn, soundsData.p2Click);
      setMatrix(gameDetails.matrix);
      checkGameState(gameDetails.matrix);
      dispatch(setRoundTime(15));
    });
  };

  const handleGameReset = () => {
    if (!socketService.socket) return;

    gameService.onResetGame(socketService.socket, (options) => {
      if (options.start) {
        setPlayerTurn(true);
      } else {
        setPlayerTurn(false);
      }
    });
  };

  const handleGameWin = () => {
    if (!socketService.socket) return;

    gameService.onGameWin(socketService.socket, (message) => {
      setGameResult(message);
    });
  };

  useEffect(() => {
    handleGameWin();
    handleGameReset();
  }, []);

  useEffect(() => {
    handleGameUpdate();
  }, [isVolumeOn]);

  return (
    <>
      <BoardContainer>
        {matrix.map((row, rowIndex) => {
          return (
            <RowContainer key={rowIndex}>
              {row.map((column, columnIndex) => (
                <Cell
                  key={columnIndex}
                  isGameStarted={isGameStarted}
                  isPlayerTurn={isPlayerTurn}
                  isSelected={!!column && column !== 'null'}
                  onClick={() => {
                    if (!(column && column !== 'null')) {
                      updateGameMatrix(columnIndex, rowIndex, playerSymbol);
                    }
                  }}
                >
                  {column && column !== 'null' ? (
                    column === 'x' ? (
                      <RxCross1 aria-label='X' size={100} color='#05d27c' />
                    ) : (
                      <RxCircle aria-label='O' size={100} color={grey[900]} />
                    )
                  ) : null}
                </Cell>
              ))}
            </RowContainer>
          );
        })}
      </BoardContainer>
    </>
  );
}

export default Board;
