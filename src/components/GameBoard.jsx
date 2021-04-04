import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HOLES_AMOUNT } from '../constants';
import { failedHit, succesfullHit } from '../redux/actions';
import { gameSliceSelector } from '../redux/reducers/gameReducer';
import getRandomNum from '../utils/getRandomNum';
import './GameBoard.scss';

const GameBoard = () => {
  const [molePosition, setMolePosition] = useState(null);
  const [failedHolePosition, setFailedHolePosition] = useState(null);
  const [succesHolePosition, setSuccesHolePosition] = useState(null);

  const dispatch = useDispatch();

  const { stepInterval } = useSelector(gameSliceSelector);

  const dispatchSucces = () => {
    dispatch(succesfullHit());

    setSuccesHolePosition(molePosition);

    setTimeout(() => setSuccesHolePosition(null), 40);
  };

  const dispatchFail = useCallback((e) => {
    const targetHole = e?.target?.closest('.game-board__hole');

    if (targetHole) {
      setFailedHolePosition(Number(targetHole.getAttribute('data-index')));
      setTimeout(() => setFailedHolePosition(null), 40);
    }

    dispatch(failedHit());
  }, [dispatch]);

  const handleGameBoardClick = (e) => {
    if (e.target.matches(`.game-board__character[data-index="${molePosition}"]`)) {
      dispatchSucces();
    } else {
      dispatchFail(e);
    }
  };

  useEffect(() => {
    let intervalId;

    if (!failedHolePosition) {
      setTimeout(() => {
        setMolePosition(getRandomNum(0, HOLES_AMOUNT));

        intervalId = setInterval(() => {
          setMolePosition(getRandomNum(0, HOLES_AMOUNT));

          if (!succesHolePosition) {
            dispatchFail();
          }
        }, stepInterval);
      }, 20);
    }

    return () => clearInterval(intervalId);
  }, [stepInterval, failedHolePosition, succesHolePosition, dispatchFail]);

  let holes = [];

  for (let i = 0; i < HOLES_AMOUNT; i++) {
    holes.push(
      <li key={i} className="game-board__cell">
        <div
          data-index={i}
          className={`game-board__hole
           ${succesHolePosition === i ? 'succes' : ''}
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
