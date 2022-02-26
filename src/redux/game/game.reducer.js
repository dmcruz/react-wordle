const INITIAL_STATE = {
  wordAnswer: '',
  userAnswers: [],
  userAnswer: '',
  isAnswered: false,
  shakeWord: '',
  keysExactMatch: [],
  keysMatch: [],
  keysNoMatch: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_WORD_ANSWER':
      return {
        ...state,
        wordAnswer: action.payload,
      };
    case 'ADD_USER_WORD':
      if (state.userAnswers.length < 6) {
        const correctAnswer = state.wordAnswer;
        const userAnswer = action.payload.split('');
        let exactMatch = [];
        let match = [];
        let noMatch = [];
        userAnswer.forEach((item, index) => {
          if (item === correctAnswer[index]) exactMatch.push(item);
          else if (correctAnswer.includes(item)) match.push(item);
          else noMatch.push(item);
        });
        return {
          ...state,
          userAnswers: [...state.userAnswers, action.payload],
          keysExactMatch: [...state.keysExactMatch, ...exactMatch],
          keysMatch: [...state.keysMatch, ...match],
          keysNoMatch: [...state.keysNoMatch, ...noMatch],
        };
      } else {
        return state;
      }
    case 'SET_USER_ANSWER':
      return {
        ...state,
        userAnswer: action.payload,
      };
    case 'SET_IS_ANSWERED':
      return {
        ...state,
        isAnswered: action.payload,
      };
    case 'SET_SHAKE_WORD':
      return {
        ...state,
        shakeWord: action.payload,
      };
    default:
      return state;
  }
};
export default gameReducer;
