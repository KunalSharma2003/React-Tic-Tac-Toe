import React from "react";
import Square from "./Square";
import { useState } from "react";
import styled from "styled-components";
const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXtrun, setIsXturn] = useState(true);
  const handleClick = (index) => {
    if (state[index] != null || checkWinner() || isDraw()) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXtrun ? "X" : "O";
    setState(copyState);
    setIsXturn(!isXtrun);
  };

  const checkWinner = () => {
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return false;
  };

  const isDraw = () => {
    return state.every((squre) => squre !== null && !checkWinner());
  };
  const isWinner = checkWinner();
  const draw = isDraw();
  const handlePlayAgain = () => {
    setState(Array(9).fill(null));
  };

  return (
    <div className="Board_Container">
      {isWinner ? (
        <>
          <h1>{isWinner} Won The Game !</h1> <br />
          <Button type="submit" onClick={handlePlayAgain}>
            Play Again !
          </Button>
        </>
      ) : draw ? (
        <>
          <h1>It's a Draw!</h1>
          <Button className="play-again-button" onClick={handlePlayAgain}>
            Play Again!
          </Button>
        </>
      ) : (
        <>
          <h1>Let's Play Tic-Tac-Toe ...</h1>
          <div className="board_row">
            <Square onClick={() => handleClick(0)} value={state[0]} />
            <Square onClick={() => handleClick(1)} value={state[1]} />
            <Square onClick={() => handleClick(2)} value={state[2]} />
          </div>
          <div className="board_row">
            <Square onClick={() => handleClick(3)} value={state[3]} />
            <Square onClick={() => handleClick(4)} value={state[4]} />
            <Square onClick={() => handleClick(5)} value={state[5]} />
          </div>
          <div className="board_row">
            <Square onClick={() => handleClick(6)} value={state[6]} />
            <Square onClick={() => handleClick(7)} value={state[7]} />
            <Square onClick={() => handleClick(8)} value={state[8]} />
          </div>
        </>
      )}
    </div>
  );
};
const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;
export default Board;
