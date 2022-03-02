import { useSelector } from 'react-redux';
import './Keypad.css';

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
      <svg viewBox="0 0 512 512">
        <path d="M490.667 64h-357.59a21.333 21.333 0 0 0-17.848 9.647L3.485 244.314a21.334 21.334 0 0 0 0 23.372l111.744 170.667A21.333 21.333 0 0 0 133.077 448h357.589c11.782 0 21.333-9.551 21.333-21.333V85.333C512 73.551 502.449 64 490.667 64zm-21.334 341.333H144.609L46.833 256l97.776-149.333h324.725v298.666z" />
        <path d="M198.246 356.418c8.331 8.331 21.839 8.331 30.17 0l70.248-70.248 70.248 70.248c8.331 8.331 21.839 8.331 30.17 0s8.331-21.839 0-30.17L328.834 256l70.248-70.248c8.331-8.331 8.331-21.839 0-30.17s-21.839-8.331-30.17 0l-70.248 70.248-70.248-70.248c-8.331-8.331-21.839-8.331-30.17 0-8.331 8.331-8.331 21.839 0 30.17L268.495 256l-70.248 70.248c-8.332 8.332-8.332 21.839-.001 30.17z" />
      </svg>
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
