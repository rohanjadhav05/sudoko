export class Sudoku {
    private board: number[][];
  
    constructor() {
      this.board = Array.from({ length: 9 }, () => Array(9).fill(0));
    }
  
    private isValid(board: number[][], row: number, col: number, num: number): boolean {
      // Check the row
      for (let c = 0; c < 9; c++) {
        if (board[row][c] === num) return false;
      }
  
      // Check the column
      for (let r = 0; r < 9; r++) {
        if (board[r][col] === num) return false;
      }
  
      // Check the 3x3 box
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if (board[r][c] === num) return false;
        }
      }
  
      return true;
    }
  
    private solve(board: number[][]): boolean {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (this.isValid(board, row, col, num)) {
                board[row][col] = num;
                if (this.solve(board)) return true;
                board[row][col] = 0;
              }
            }
            return false;
          }
        }
      }
      return true;
    }
  
    private removeCells(board: number[][], clues: number): void {
      let count = 81;
      while (count > clues) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
          board[row][col] = 0;
          count--;
        }
      }
    }
  
    public generatePuzzle(clues: number): number[][] {
      this.solve(this.board);
      this.removeCells(this.board, clues);
      return this.board;
    }
}
  