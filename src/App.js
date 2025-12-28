import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import './App.css';
import GameCanvas from './components/GameCanvas';
import Keypad from './components/Keypad';
import store from './redux/store';
import { resetGame, setWordAnswer } from './redux/game/game.action';
import { listWords } from './data/listWords';

function AppContent() {
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(resetGame());
    const randIndex = Math.floor(Math.random() * listWords.length);
    const correctAnswer = listWords[randIndex];
    dispatch(setWordAnswer(correctAnswer));
  };

  return (
    <div className="App">
      <header>
        <h1>Wordle Clone</h1>
        <button className="refresh-button" onClick={handleRefresh}>
          🔄 New Game
        </button>
      </header>
      <GameCanvas />
      <br />
      <Keypad />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
