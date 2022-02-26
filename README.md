# Wordle Clone

Refresh browser for new wordle

# Implementation
- Components: GameCanvas, WordRow, LetterTile, Keypad
- Loaded the list of words (from wordle source) in memory
- GameCanvas window.addEventListener to listen to keydown event
- Keypad buttons to dispatch keydown event
- On enter LetterTile changes color according to tile mode: shake (invalid word), exact-match (letter position is correct), match (letter is present), no-match (letter is not in the word)
