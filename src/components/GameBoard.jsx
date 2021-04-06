import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HOLES_AMOUNT, SHORT_DELAY, LONG_DELAY } from '../constants';
import {
  failedHit, hideMole, showMole, successfulHit,
} from '../redux/actions';
import { gameSliceSelector } from '../redux/reducers/gameReducer';
import './GameBoard.scss';

const GameBoard = () => {
  const { stepInterval, molePosition } = useSelector(gameSliceSelector);
  const [failedHolePosition, setFailedHolePosition] = useState(null);
  const [successHolePosition, setSuccessHolePosition] = useState(null);

  const dispatch = useDispatch();

  const showNewMole = useCallback(() => {
    dispatch(hideMole());

    setTimeout(() => dispatch(showMole()), SHORT_DELAY);
  }, [dispatch]);

  const dispatchSuccess = () => {
    setSuccessHolePosition(molePosition);

    showNewMole();

    setTimeout(() => {
      setSuccessHolePosition(null);
      dispatch(successfulHit());
    }, LONG_DELAY);
  };

  const dispatchFail = useCallback((e) => {
    const targetHole = e?.target?.closest('.game-board__hole');

    if (targetHole) {
      setFailedHolePosition(Number(targetHole.getAttribute('data-index')));
    }

    showNewMole();
    setTimeout(() => {
      setFailedHolePosition(null);
      dispatch(failedHit());
    }, LONG_DELAY);
  }, [dispatch, showNewMole]);

  const handleGameBoardClick = (e) => {
    if (e.target.matches(`.game-board__character[data-index="${molePosition}"]`)) {
      dispatchSuccess();
    } else {
      dispatchFail(e);
    }
  };

  useEffect(() => {
    showNewMole();
  }, [showNewMole]);

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      if (!successHolePosition) dispatchFail();
    }, stepInterval);

    return () => clearInterval(intervalId);
  }, [stepInterval, failedHolePosition, successHolePosition, dispatchFail]);

  let holes = [];

  for (let i = 0; i < HOLES_AMOUNT; i++) {
    holes.push(
      <li key={i} className="game-board__cell">
        <div
          data-index={i}
          className={`game-board__hole
           ${successHolePosition === i ? 'success' : ''}
           ${failedHolePosition === i ? 'failed' : ''}
           `}
        >
          <img
            data-index={i}
            className={`game-board__character ${molePosition === i ? 'show' : ''}`}
            src="./img/mole.png"
            alt="character"
          />
        </div>
      </li>,
    );
  }

  return (
    <ul
      onClick={handleGameBoardClick}
      className="game-board"
    >
      {holes}
    </ul>
  );
};

export default GameBoard;
