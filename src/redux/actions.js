import {
  FAILED_GAME, FAILED_HIT, START_GAME, SUCCESSFUL_HIT, WIN_GAME, HIDE_MOLE, SHOW_MOLE,
} from './types';

export const startGame = () => ({ type: START_GAME });

export const winGame = () => ({ type: WIN_GAME });

export const failedGame = () => ({ type: FAILED_GAME });

export const successfulHit = () => ({ type: SUCCESSFUL_HIT });

export const failedHit = () => ({ type: FAILED_HIT });

export const hideMole = () => ({ type: HIDE_MOLE });

export const showMole = () => ({ type: SHOW_MOLE });
