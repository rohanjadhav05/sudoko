import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generateSudoku, validateSudoku } from './sudoku';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/board', (req:any, res:any) => {
  const board = generateSudoku();
  res.json({ board });
});

app.post('/api/validate', (req:any, res:any) => {
  const { board } = req.body;
  const valid = validateSudoku(board);
  res.json({ valid });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
