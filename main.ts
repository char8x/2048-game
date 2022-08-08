// game based on https://play2048.co/

import { initBoard, printBoard } from "./utils.ts";

const board = initBoard(Array(16).fill(""));
console.log(board);
printBoard(board);
