import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAttemptNumber } from '../redux/game/game.selectors';
import LetterTile from './LetterTile';

import './WordRow.css';

const WordRow = ({ rowNum }) => {
  const [word, setWord] = useState('');

  const wordAnswer = useSelector((state) => state.game.wordAnswer);
  const attemptNumber = useSelector((state) => userAttemptNumber()(state));
  const userAnswer = useSelector((state) => state.game.userAnswer);
  const userAnswers = useSelector((state) => state.game.userAnswers);
  const shakeWord = useSelector((state) => state.game.shakeWord);

  useEffect(() => {
    if (rowNum + 1 === attemptNumber + 1) {
      setWord(userAnswer);
    } else {
      setWord(userAnswers[rowNum]);
    }
  }, [attemptNumber, rowNum, userAnswer, userAnswers]);

  const getLetter = (word, index) => {
    if (!word) return '';
    return word.length >= index + 1 ? word[index] : '';
  };

  const w = word?.toString();
  const ltr1 = getLetter(w, 0);
  const ltr2 = getLetter(w, 1);
  const ltr3 = getLetter(w, 2);
  const ltr4 = getLetter(w, 3);
  const ltr5 = getLetter(w, 4);

  const getTileMode = (letter, position) => {
    if (!letter) return;
    if (word === shakeWord) return 'shake';

    const isRowAnswered = rowNum < attemptNumber;
    if (!isRowAnswered) return '';

    if (wordAnswer[position] === letter) {
      return 'exact-match';
    } else if (wordAnswer.includes(letter)) {
      return 'match';
    } else {
      return 'no-match';
    }
  };

  return (
    <div className="word-row">
      <LetterTile letter={ltr1} mode={getTileMode(ltr1, 0)} />
      <LetterTile letter={ltr2} mode={getTileMode(ltr2, 1)} />
      <LetterTile letter={ltr3} mode={getTileMode(ltr3, 2)} />
      <LetterTile letter={ltr4} mode={getTileMode(ltr4, 3)} />
      <LetterTile letter={ltr5} mode={getTileMode(ltr5, 4)} />
    </div>
  );
};
export default WordRow;
