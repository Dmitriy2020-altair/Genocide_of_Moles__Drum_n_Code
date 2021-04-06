import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import { gameStatus } from './constants';
import { startGame } from './redux/actions';
import { gameSliceSelector } from './redux/reducers/gameReducer';

function App() {
  const gameSlice = useSelector(gameSliceSelector);

  const dispatch = useDispatch();

  const dispatchStartGame = () => dispatch(startGame());

  let gameBody;

  if (gameSlice.gameStatus === gameStatus.notStarted) {
    gameBody = (
      <button
        className="modal__btn centered-btn"
        onClick={dispatchStartGame}
      >
        Start Game
      </button>
    );
  } else if (gameSlice.gameStatus === gameStatus.inProgress) {
    gameBody = (
      <>
        <GameBoard />
        <GameInfo />
      </>
    );
  } else if (gameSlice.gameStatus === gameStatus.overFailed) {
    gameBody = (
      <div className="modal">
        <h2>Game over!</h2>
        <button
          className="modal__btn"
          onClick={dispatchStartGame}
        >
          Restart Game
        </button>
      </div>
    );
  } else if (gameSlice.gameStatus === gameStatus.overSuccessfully) {
    gameBody = (
      <div className="modal">
        <h2>Congratulations, you won!</h2>
        <GameInfo />
        <button
          className="modal__btn"
          onClick={dispatchStartGame}
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      {gameBody}
    </div>
  );
}

export default App;
