const INITIAL_STATE = {
  wordAnswer: '',
  userAnswers: [],
  userAnswer: '',
  isAnswered: false,
  shakeWord: '',
  keysExactMatch: [],
  keysMatch: [],
  keysNoMatch: [],
  isEvaluating: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_WORD_ANSWER':
      return {
        ...state,
        wordAnswer: action.payload,
      };
    case 'ADD_USER_WORD_BEGIN':
      return {
        ...state,
        isEvaluating: true,
      };
    case 'ADD_USER_WORD':
      const len = state.userAnswers.length;
      if (len < 6) {
        // prevent duplicates when entering quickly
        if (
          len > 0 &&
          state.userAnswer === '' &&
          state.userAnswers[len - 1] === action.payload
        ) {
          return {
            ...state,
            isEvaluating: false,
          };
        }
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
          isEvaluating: false,
          userAnswer: '',
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
