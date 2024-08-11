# Sudoku Web Application

This is a web-based Sudoku application built with React for the frontend and Node.js for the backend. The application allows users to play Sudoku, check their solutions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Features

- Generate Sudoku puzzles.
- Choose different Difficulty levels.
- Timer to check your speed
- Validate Sudoku puzzles to check if the solution is correct.
- Get hints for solving the puzzle.
- Responsive design for playing on various devices.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- React

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/rohanjadhav05/sudoko.git
    cd sudoku-backend/
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Compile the Typescript code and start the backend server:

    ```bash
    tsc -b
    node dist/index.js
    ```

    The backend server will be running on `http://localhost:4000`.

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ../sudoku-game
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the frontend server:

    ```bash
    npm start
    ```

    The frontend server will be running on `http://localhost:3000`.

## Usage

1. Open your web browser and go to `http://localhost:3000`.
2. Start a new Game.
3. Choose difficultly level
4. Solve the puzzle or use the "Get Solution" button to validate your progress.
5. Reset the game if you are stuck.

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express
- **Other**: Axios (for API requests), HTML5

## Project Structure

```plaintext
sudoku-app/
├── sudoku-backend/
│   ├── ClassSudoku.ts
│   ├── index.ts
│   ├── sudoku.ts
│   ├── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── App.js
│   ├── index.js
│   ├── package.json
├── README.md

