import { Sudoku } from "./ClassSudoku";

  export function generateSudoku(difficulty : string) {
    var no : number = 0; 
    if(difficulty === 'easy'){
      no = 30;
    }else if(difficulty === 'medium'){
      no = 23;
    }else{
      no = 17;
    }
    const sudoku = new Sudoku();
    const puzzle = sudoku.generatePuzzle(no);
    return puzzle;
  }
  
  export function sudokoSolver(board : any) : Boolean{
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
  
  export function validateSudoku(board: number[][]) : Boolean{
    // Helper function to check if a list of numbers contains duplicates (excluding zeros)
    const hasDuplicates = (numbers: number[]): boolean => {
      const seen = new Set<number>();
      for (const num of numbers) {
        if (num !== 0) {
          if (seen.has(num)) return true;
          seen.add(num);
        }
      }
      return false;
    };

    // Check all rows
    for (let row = 0; row < 9; row++) {
      if (hasDuplicates(board[row])) return false;
    }

    // Check all columns
    for (let col = 0; col < 9; col++) {
      const column: number[] = [];
      for (let row = 0; row < 9; row++) {
        column.push(board[row][col]);
      }
      if (hasDuplicates(column)) return false;
    }

    // Check all 3x3 sub-grids
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const box: number[] = [];
        for (let row = boxRow; row < boxRow + 3; row++) {
          for (let col = boxCol; col < boxCol + 3; col++) {
            box.push(board[row][col]);
          }
        }
        if (hasDuplicates(box)) return false;
      }
    }

    // If all checks pass, the board is valid
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
  
  