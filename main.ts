// game based on https://play2048.co/

import {
  checkGameOver,
  checkWin,
  initBoard,
  moveToBottom,
  moveToLeft,
  moveToRight,
  moveToTop,
  printBoard,
  setNewNumber,
} from "./utils.ts";

function checkGame(board: Array<string | number>) {
  checkWin(board);
  checkGameOver(board);
}

let board: Array<string | number> = initBoard(Array(16).fill(""));
printBoard(board);
console.log("moveToBottom");
board = moveToBottom(board);
checkGame(board);
board = setNewNumber(board);
printBoard(board);
console.log("moveToLeft");
board = moveToLeft(board);
checkGame(board);
board = setNewNumber(board);
printBoard(board);
console.log("moveToRight");
board = moveToRight(board);
checkGame(board);
board = setNewNumber(board);
printBoard(board);
console.log("moveToTop");
board = moveToTop(board);
checkGame(board);
board = setNewNumber(board);
printBoard(board);
console.log("moveToBottom");
board = moveToBottom(board);
checkGame(board);
board = setNewNumber(board);
printBoard(board);
console.log("moveToLeft");
board = moveToLeft(board);
checkGame(board);
board = setNewNumber(board);
printBoard(board);
