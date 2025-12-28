# Wordle Clone

A React-based clone of the popular Wordle game with Redux state management.

## How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/dmcruz/react-wordle.git
   cd react-wordle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   
   The app will automatically open at `http://localhost:3000/react-wordle`

## Features

- Click the "🔄 New Game" button in the top right to start a new game
- Type letters using your keyboard
- Press Enter to submit your guess
- Press Backspace to delete letters

# Implementation
- Components: GameCanvas, WordRow, LetterTile, Keypad
- Loaded the list of words (from wordle source) in memory
- GameCanvas window.addEventListener to listen to keydown event
- Keypad buttons to dispatch keydown event
- On enter LetterTile changes color according to tile mode: shake (invalid word), exact-match (letter position is correct), match (letter is present), no-match (letter is not in the word)
