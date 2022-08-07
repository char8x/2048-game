// game based on https://play2048.co/

import { getRandomIntInclusive, initBoard, printBoard } from "./utils.ts";

const board = Array(16).fill("");

initBoard(board);
console.log(board);
printBoard(board);
