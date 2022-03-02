import WordRow from './WordRow';
import { listWords, validWords } from '../data/listWords';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserWord,
  setIsAnswered,
  setShakeWord,
  setUserAnswer,
  setWordAnswer,
} from '../redux/game/game.action';
import { userAttemptNumber } from '../redux/game/game.selectors';

import './GameCanvas.css';
const GameCanvas = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const isAnswered = useSelector((state) => state.game.isAnswered);
  const userAnswer = useSelector((state) => state.game.userAnswer);
  const wordAnswer = useSelector((state) => state.game.wordAnswer);
  const attemptNumber = useSelector((state) => userAttemptNumber()(state));

  const handleKeyDown = useCallback(
    (event) => {
      if (isAnswered) return;
      if (/^[A-Za-z]$/i.test(event.key) && userAnswer.length < 5) {
        dispatch(setUserAnswer(userAnswer + event.key.toLowerCase()));
      } else if (event.key === 'Backspace') {
        if (userAnswer.length > 0) {
          dispatch(setUserAnswer(userAnswer.slice(0, -1)));
        }
      } else if (event.key === 'Enter') {
        if (userAnswer.length === 5) {
          if (
            listWords.includes(userAnswer) ||
            validWords.includes(userAnswer)
          ) {
            dispatch({ type: 'ADD_USER_WORD_BEGIN' });
            setTimeout(() => {
              dispatch(addUserWord(userAnswer));

              // reveal the answer
              if (userAnswer === wordAnswer) {
                dispatch(setIsAnswered(true));
                setErrorMessage('Impressive');
              } else if (attemptNumber === 5 && userAnswer !== wordAnswer) {
                setErrorMessage(wordAnswer.toUpperCase());
                dispatch(setIsAnswered(true));
              }
            }, 800);
          } else {
            setErrorMessage('Not in word list');
            dispatch(setShakeWord(userAnswer));
            setTimeout(() => {
              setErrorMessage('');
            }, 2000);
          }
        }
      }
    },
    [attemptNumber, dispatch, isAnswered, userAnswer, wordAnswer]
  );

  // pick a random word for this session --- this changes on reload
  useEffect(() => {
    const randIndex = Math.floor(Math.random() * listWords.length);
    const correctAnswer = listWords[randIndex];
    dispatch(setWordAnswer(correctAnswer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // add keypress listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userAnswer, handleKeyDown]);

  const wordRows = [...Array(6).keys()].map((item) => (
    <WordRow rowNum={item} key={`wr${item}`} />
  ));
  return (
    <div>
      <div className="message-container">
        <div
          className="game-message"
          style={{ display: errorMessage === '' ? 'none' : 'block' }}
        >
          {errorMessage}
        </div>
      </div>
      <div className="container">
        <div className="game-canvas">{wordRows}</div>
      </div>
    </div>
  );
};
export default GameCanvas;
