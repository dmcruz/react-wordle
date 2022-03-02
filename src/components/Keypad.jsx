import { useSelector } from 'react-redux';
import './Keypad.css';
import Backspace from './backspace.svg';

const Keypad = () => {
  const r1 = 'qwertyuiop'.split('');
  const r2 = 'asdfghjkl'.split('');
  const r3 = ['Enter', ...'zxcvbnm'.split(''), 'Backspace'];

  const handleClick = (event, code) => {
    let keyCode = code;
    if (code === 'Backspace') {
      keyCode = 'Backspace';
    } else if (code === 'Enter') {
      keyCode = 'Enter';
    }
    window.dispatchEvent(new KeyboardEvent('keydown', { key: keyCode }));
  };

  const keysExactMatch = useSelector((state) => state.game.keysExactMatch);
  const keysMatch = useSelector((state) => state.game.keysMatch);
  const keysNoMatch = useSelector((state) => state.game.keysNoMatch);

  const getKeyMode = (letter) => {
    if (keysExactMatch.includes(letter)) return 'exact-match';
    else if (keysMatch.includes(letter)) return 'match';
    else if (keysNoMatch.includes(letter)) return 'no-match';
    else return '';
  };

  const r1Keys = r1.map((item, index) => (
    <button
      className={getKeyMode(item)}
      key={`r1${index}`}
      onClick={() => handleClick(this, item)}
    >
      {item}
    </button>
  ));
  const r2Keys = r2.map((item, index) => (
    <button
      className={getKeyMode(item)}
      key={`r2${index}`}
      onClick={() => handleClick(this, item)}
    >
      {item}
    </button>
  ));
  const elBackspace = (
    <>
      <span className="spacer"></span>
      <img src={Backspace} alt="Backspace" width="70%" height="70%" />
      <span className="spacer"></span>
    </>
  );
  const r3Keys = r3.map((item, index) => (
    <button
      className={
        ['enter', 'backspace'].includes(item.toLocaleLowerCase())
          ? 'special'
          : getKeyMode(item)
      }
      key={`r3${index}`}
      onClick={() => handleClick(this, item)}
    >
      {item === 'Backspace' ? elBackspace : item}
    </button>
  ));
  return (
    <div className="keypad">
      <div className="row">{r1Keys}</div>
      <div className="row">
        <div className="spacer-half" />
        {r2Keys}
        <div className="spacer-half" />
      </div>
      <div className="row">{r3Keys}</div>
    </div>
  );
};
export default Keypad;
