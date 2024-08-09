import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  useEffect(() => {
    // Fetch the initial Sudoku board from the server
    axios.get('http://65.0.102.194:4000/api/board')
      .then(response => {
        const fetchedBoard = response.data.board;
        setBoard(fetchedBoard);
        setInitialBoard(JSON.parse(JSON.stringify(fetchedBoard)));
      })
      .catch(error => console.error(error));
  }, []);

  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if(selectedCell.row === -1 || selectedCell.col === -1){
      alert("Please select the box then add the value");
    }
    else if(value < 1 || value > 9){
      alert("Entered number cannot be smaller than 1 and greater than 9");
    }
    else if (value >= 1 && value <= 9) {
      const newBoard = [...board];
      newBoard[selectedCell.row][selectedCell.col] = value;
      setBoard(newBoard);
    }
  };

  const handleSubmit = () => {
    if(allValuesInserted(board)){
      axios.post('http://65.0.102.194:4000/api/validate', { board })
      .then(response => {
        if (response.data.valid) {
          alert('Congratulations! You solved it correctly.');
        } else {
          alert('OOPS! There are mistakes in your solution.');
        }
      })
      .catch(error => console.error(error));
    }
    else{
      alert("Please Insert all values then complete the game");
    }
  };

  const handleNewGame = () => {
    if(window.confirm("Are you sure you want to start a new game? This will overwrite your current progress. Please confirm if you'd like to proceed.")){
      axios.get('http://65.0.102.194:4000/api/board')
      .then(response => {
        const fetchedBoard = response.data.board;
        setBoard(fetchedBoard);
        setInitialBoard(JSON.parse(JSON.stringify(fetchedBoard)));
      })
      .catch(error => console.error(error));
    }
    
  };
  
  function allValuesInserted(board){
    console.log(JSON.stringify(board));
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        if(board[i][j] === 0 ){
          return false;
        }
      }
    }
    return true;
  }

  function resetBoard(){
    if(window.confirm("Are you sure you want to reset the game? All progress will be lost. Please confirm if you want to proceed.")){
      setBoard(JSON.parse(JSON.stringify(initialBoard)));
    }
  }
  function getSolution(){
    if(window.confirm("Are you certain you want to see the Sudoku solution? This will display the completed puzzle.")){
      axios.post("http://65.0.102.194:4000/api/getSolution", {initialBoard})
      .then(response => {
        setBoard(response.data.initialBoard);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
  return (
    <div className="App">
  <div className="wrapper">
    <h1 style={{display:'flex', justifyContent:'center'}}>Sudoku Game</h1>

    <div className="board">
      <div className="button-group">
        <button onClick={resetBoard}>Reset Game</button>
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={getSolution}>Get the solution</button>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => {
              const isInitial = initialBoard[rowIndex][colIndex] !== 0;
              return (
                <div
                  key={colIndex}
                  className={`cell ${selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''} ${isInitial ? 'initial' : 'user'} `}
                  onClick={!isInitial ? () => handleCellClick(rowIndex, colIndex) : undefined}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>

    <div className="input-container">
      <h5>Select block and insert value</h5>
      <input
        type="number"
        min="1"
        max="9"
        onChange={handleInputChange}
        className="number-input"
      />
      <button onClick={handleSubmit} className="complete-button">
        Complete Game
      </button>
    </div>
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
