export const setWordAnswer = (answer) => ({
  type: 'SET_WORD_ANSWER',
  payload: answer,
});

export const clearUserAnswer = () => ({
  type: 'SET_USER_ANSWER',
  payload: '',
});

export const setUserAnswer = (userAnswer) => ({
  type: 'SET_USER_ANSWER',
  payload: userAnswer,
});

export const addUserWord = (userGuess) => ({
  type: 'ADD_USER_WORD',
  payload: userGuess,
});

export const setIsAnswered = (isAnswered) => ({
  type: 'SET_IS_ANSWERED',
  payload: isAnswered,
});

// word not in list gimmick
export const setShakeWord = (shakeWord) => ({
  type: 'SET_SHAKE_WORD',
  payload: shakeWord,
});
