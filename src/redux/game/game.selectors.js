import { createSelector } from 'reselect';

const selectUserAnswers = (state) => state.game.userAnswers;

export const userAttemptNumber = () =>
  createSelector([selectUserAnswers], (userAnswers) => {
    return userAnswers.length;
  });
