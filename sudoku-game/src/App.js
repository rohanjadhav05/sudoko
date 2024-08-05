import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: -1, col: -1 });

  useEffect(() => {
    // Fetch the initial Sudoku board from the server
    axios.get('http://localhost:4000/api/board')
      .then(response => setBoard(response.data.board))
      .catch(error => console.error(error));
  }, []);

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
    //if(allValuesInserted(board)){
      axios.post('http://localhost:4000/api/validate', { board })
      .then(response => {
        if (response.data.valid) {
          alert('Congratulations! You solved it correctly.');
        } else {
          alert('There are mistakes in your solution.');
        }
      })
      .catch(error => console.error(error));
    //}
    //else{
    //  alert("Please Insert all values then complete the game");
    //x}
  };
  
  function allValuesInserted(board){
    console.log(JSON.stringify(board));
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        if(board[i][j] == 0 ){
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div className="App">
      <h1>Sudoku Game</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="input-section">
        <input type="number" min="1" max="9" onChange={handleInputChange} />
        <button onClick={handleSubmit}>Complete Game</button>
      </div>
    </div>
  );
}

export default App;
