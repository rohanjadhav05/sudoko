
export function generateSudoku() {
    // Generate a basic solvable Sudoku puzzle. This is just a placeholder.
    // Replace this with a proper Sudoku generation algorithm.
    type NineByNineArray = number[][];

    type ArrayOfTen2DArrays = NineByNineArray[];

    const arrayOf2DArrays: ArrayOfTen2DArrays = [
      [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
      ],
      [
        [0, 2, 0, 0, 0, 5, 7, 0, 0],
        [0, 4, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5],
        [8, 0, 0, 5, 2, 0, 0, 0, 0],
        [0, 0, 0, 7, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 8, 3, 5, 2],
        [0, 0, 1, 8, 7, 2, 0, 6, 0],
        [0, 0, 0, 0, 0, 0, 0, 7, 4],
        [0, 0, 0, 0, 0, 4, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 4, 0, 7, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0],
        [0, 0, 9, 0, 0, 8, 0, 0, 4],
        [0, 0, 0, 0, 0, 7, 0, 0, 0],
        [6, 5, 0, 0, 0, 0, 0, 4, 0],
        [0, 9, 0, 0, 0, 3, 0, 0, 0],
        [0, 0, 1, 0, 0, 5, 0, 0, 0],
        [0, 7, 0, 0, 1, 0, 0, 0, 0],
        [9, 0, 0, 0, 0, 2, 0, 0, 0],
      ],
      [
        [7, 0, 0, 0, 4, 5, 6, 8, 0],
        [0, 0, 0, 0, 0, 9, 0, 0, 0],
        [6, 0, 0, 0, 2, 7, 3, 0, 0],
        [4, 0, 1, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 2, 0, 0],
        [0, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 0, 5, 0, 0, 0, 9, 0, 4],
        [0, 0, 0, 0, 0, 4, 0, 0, 2],
        [0, 0, 0, 7, 0, 0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 2, 3, 0, 0, 0, 9],
        [0, 5, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 0, 0, 0, 6],
        [0, 9, 0, 0, 0, 0, 0, 0, 0],
        [0, 4, 0, 0, 0, 0, 0, 7, 0],
        [0, 0, 0, 0, 7, 0, 0, 0, 2],
        [9, 7, 3, 0, 2, 0, 5, 0, 0],
      ],
      [
        [1, 0, 0, 0, 0, 0, 0, 8, 0],
        [0, 5, 0, 0, 8, 0, 1, 0, 0],
        [0, 0, 0, 0, 3, 0, 2, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [4, 6, 0, 0, 0, 0, 3, 0, 0],
        [0, 9, 0, 0, 0, 2, 5, 4, 0],
        [5, 2, 0, 0, 0, 0, 0, 7, 0],
        [6, 0, 0, 9, 7, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 3, 0, 6, 0],
      ]
    ];
    const randomIndex = Math.floor(Math.random() * arrayOf2DArrays.length);

    return arrayOf2DArrays[randomIndex];
  }
  
  function sudokoSolver(board : any) : Boolean{
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        if(board[i][j] == 0){
          for(var ch = 1; ch <= 9; ch++){
            if(isValid(board,i,j,ch)){
              board[i][j] = ch;
              if(sudokoSolver(board)){
                return true;
              }else{
                board[i][j] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  export function validateSudoku(board : any) : Boolean{
    const boardCopy = JSON.parse(JSON.stringify(board));
    sudokoSolver(boardCopy);
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        if(board[i][j] != boardCopy[i][j]){
          return false;
        }
      }
    }
    return true;
  }

  function isValid(board : any, row : number, col : number, ch : number) : Boolean{
    for(let i = 0; i < 9; i++){
      if(board[row][i] != 0 && board[row][i] == ch){
        return false;
      }
      if(board[i][col] != 0 && board[i][col] == ch){
        return false;
      }
    }
    var rowStart;
    var rowEnd;
    var colStart;
    var colEnd;
        
    if(row >= 0 && row < 3){
        rowStart = 0;
        rowEnd = 3;
    }
    else if(row >= 3 && row < 6){
        rowStart = 3;
        rowEnd = 6;
    }else{
        rowStart = 6;
        rowEnd = 9;
    }

    if(col >= 0 && col < 3){
        colStart = 0;
        colEnd = 3;
    }
    else if(col >= 3 && col < 6){
        colStart = 3;
        colEnd = 6;
    }else{
        colStart = 6;
        colEnd = 9;
    }

    // check for the daigonal box
    for(let i = rowStart; i < rowEnd; i++){
        for(let j = colStart; j < colEnd; j++){
            if(board[i][j] != '.' && board[i][j] == ch){
                return false;
            }
            
        }
    }
    return true;
  }
  
  