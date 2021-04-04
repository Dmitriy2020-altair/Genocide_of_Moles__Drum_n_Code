import { useSelector } from 'react-redux';
import { gameSliceSelector } from '../redux/reducers/gameReducer';
import './GameInfo.scss';

const GameInfo = () => {
  const {
    score,
    fails,
    stepInterval,
  } = useSelector(gameSliceSelector);

  return (
    <ul className="game-info">
      <li>
        {`Score: ${score}`}
      </li>
      <li>
        {`Fails: ${fails}`}
      </li>
      <li>
        {`Time to hit the mole: ${stepInterval / 1000}s.`}
      </li>
      <li>
        {`Difficulty level: ${Math.round(score / 10)}`}
      </li>

    </ul>
  );
};

export default GameInfo;
