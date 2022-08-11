import {
  calculateRow,
  generateEmptyArr,
  getTwoPosition,
  initBoard,
  moveToBottom,
  moveToTop,
  printBoard,
} from "./utils.ts";

console.table(
  [
    console.log(
      "%c1 %c2 %c3 %c4",
      "color: blue",
      "color: red",
      "color: blue",
      "color: red",
    ),
    console.log("%c 1 2 3 4", "color: red"),
    console.log("%c 1 2 3 4", "color: yellow"),
    console.log("%c 1 2 3 4", "color: green"),
  ],
);
