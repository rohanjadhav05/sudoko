import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });
  const [difficulty, setDifficulty] = useState(null);
  const [isPromptVisible, setIsPromptVisible] = useState(true);
  const [timer, setTimer] = useState(0);  // Timer state
  const timerRef = useRef(null); 

  //const BACKEND_BASE_API = "http://localhost:4000";
  const BACKEND_BASE_API = "http://65.0.102.194:4000";

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);
    setIsPromptVisible(false);
    startTimer();
  };

  useEffect(() => {
    if (difficulty) {
      axios.get(`${BACKEND_BASE_API}/api/board`, {
        params: { difficulty }
      })
        .then(response => {
          const fetchedBoard = response.data.board;
          setBoard(fetchedBoard);
          setInitialBoard(JSON.parse(JSON.stringify(fetchedBoard)));
        })
        .catch(error => console.error(error));
    }
  }, [difficulty]);

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 9) {
      const newBoard = [...board];
      newBoard[selectedCell.row][selectedCell.col] = value;
      setBoard(newBoard);
    }
  };

  const handleSubmit = () => {
    if (allValuesInserted(board)) {
      stopTimer();
      axios.post(`${BACKEND_BASE_API}/api/validate`, { board })
        .then(response => {
          if (response.data.valid) {
            alert('Congratulations! You solved it correctly.');
          } else {
            alert('OOPS! There are mistakes in your solution.');
          }
        })
        .catch(error => console.error(error));
    } else {
      alert("Please insert all values before completing the game.");
    }
  };

  const handleNewGame = () => {
    if (window.confirm("Are you sure you want to start a new game? This will overwrite your current progress.")) {
      setIsPromptVisible(true);
      setBoard([]);
      setInitialBoard([]);
      resetTimer();
    }
  };

  function startTimer() {
    if (timerRef.current) return;  // Prevent multiple intervals
    timerRef.current = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }

  function resetTimer() {
    stopTimer();
    setTimer(0);
  }

  function allValuesInserted(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return false;
        }
      }
    }
    return true;
  }

  function resetBoard() {
    if (window.confirm("Are you sure you want to reset the game? All progress will be lost.")) {
      resetTimer();
      startTimer();
      setBoard(JSON.parse(JSON.stringify(initialBoard)));
    }
  }

  function getSolution() {
    if (window.confirm("Are you certain you want to see the Sudoku solution? This will display the completed puzzle.")) {
      axios.post(`${BACKEND_BASE_API}/api/getSolution`, { initialBoard })
        .then(response => {
          setBoard(response.data.initialBoard);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  return (
    <div className="App">
      <div className="wrapper">
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Sudoku Game</h1>

        {isPromptVisible && (
          <div className='board'>
            <h3>Choose Difficulty</h3>
            <div>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  onChange={handleDifficultyChange}
                />
                Easy
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  onChange={handleDifficultyChange}
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  onChange={handleDifficultyChange}
                />
                Hard
              </label>
            </div>
          </div>
        )}

        {!isPromptVisible && (
          <>
            <div className="board">
              <div className="button-group">
                <button onClick={resetBoard}>Reset Game</button>
                <button onClick={handleNewGame}>New Game</button>
                <button onClick={getSolution}>Get the solution</button>
              </div>
              <div className="timer">
                <h3>Timer: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</h3>
              </div>
              <div className="board">
                {board.map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => {
                      const isInitial = initialBoard[rowIndex][colIndex] !== 0;
                      const isSelected = selectedCell.row === rowIndex && selectedCell.col === colIndex;

                      return (
                        <div
                          key={colIndex}
                          className={`cell ${isSelected ? 'selected' : ''} ${isInitial ? 'initial' : 'user'}`}
                          onClick={!isInitial ? () => handleCellClick(rowIndex, colIndex) : undefined}
                        >
                          {isSelected && !isInitial ? (
                            <input 
                              type="text"
                              min="1"
                              max="9"
                              value={cell !== 0 ? cell : ''}
                              onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                              onBlur={() => setSelectedCell({ row: -1, col: -1 })} // Deselect after editing
                              className="cell-input"
                              autoFocus
                            />
                          ) : (
                            cell !== 0 ? cell : ''
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="input-container">
              <button onClick={handleSubmit} className="complete-button">
                Complete Game
              </button>
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        <h3>
          Follow me on{' '}
          <a href="https://www.linkedin.com/in/rohan-jadhav-0511s/">LinkedIn</a>, {' '}
          <a href="https://github.com/rohanjadhav05">GitHub</a>, and{' '}
          <a href="https://twitter.com/mrrj0511">Twitter</a>. For inquiries, contact us at{' '}
          <a href="mailto:rohan.jadhav511@gmail.com">Mail</a>.
        </h3>
      </footer>
    </div>
  );
}

export default App;
