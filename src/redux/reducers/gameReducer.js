import { gameStatus } from '../../constants';
import {
  FAILED_GAME, FAILED_HIT, START_GAME, SUCCESFULL_HIT, WIN_GAME,
} from '../types';

const initialState = {
  score: 0,
  fails: 0,
  stepInterval: 4000,
  gameStatus: gameStatus.notStarted,
};

const gameReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case START_GAME: {
      return {
        ...initialState,
        gameStatus: gameStatus.inProgress,
      };
    }

    case WIN_GAME: {
      return {
        ...state,
        gameStatus: gameStatus.overSuccesfully,
      };
    }

    case FAILED_GAME: {
      return {
        ...state,
        gameStatus: gameStatus.overFailed,
      };
    }

    case SUCCESFULL_HIT: {
      const newScore = state.score + 1;

      return {
        ...state,
        score: newScore,
        gameStatus: (newScore === 100) ? gameStatus.overSuccesfully : state.gameStatus,
        stepInterval: (newScore % 10 === 0) ? state.stepInterval - 300 : state.stepInterval,
      };
    }

    case FAILED_HIT: {
      const newFailsCount = state.fails + 1;

      return {
        ...state,
        fails: newFailsCount,
        gameStatus: (newFailsCount === 3) ? gameStatus.overFailed : state.gameStatus,
      };
    }

    default:
      return state;
  }
};

export const gameSliceSelector = (store) => store.gameReducer;

export default gameReducer;
