import './LetterTile.css';

const LetterTile = ({ letter, mode }) => {
  let tileClassName = `square ${mode}`;
  return <div className={tileClassName}>{!!letter ? letter : ''}</div>;
};

export default LetterTile;
