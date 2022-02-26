import { Provider } from 'react-redux';
import './App.css';
import GameCanvas from './components/GameCanvas';
import Keypad from './components/Keypad';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header>
          <h1>Wordle Clone</h1>
        </header>
        <GameCanvas />
        <br />
        <Keypad />
      </div>
    </Provider>
  );
}

export default App;
