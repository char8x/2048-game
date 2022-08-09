// https://deno.land/std@0.151.0/testing
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.151.0/testing/asserts.ts";
import {
  calculateRow,
  checkGameOver,
  generateEmptyArr,
  getTwoPosition,
  hasSameNumberNearby,
  initBoard,
  moveToBottom,
  moveToLeft,
  moveToRight,
  moveToTop,
  printBoard,
} from "./utils.ts";

Deno.test("test hasSameNumberNearby", () => {
  assertEquals(hasSameNumberNearby([]), false);
  assertEquals(hasSameNumberNearby([1]), false);
  assertEquals(hasSameNumberNearby([1, 2, 3, 4]), false);
  assertEquals(hasSameNumberNearby([2, 2]), true);
  assertEquals(hasSameNumberNearby([2, 2, 2]), true);
  assertEquals(hasSameNumberNearby([2, 2, 2, 2]), true);
});

Deno.test("test checkGameOver", () => {
  assertEquals(checkGameOver(initBoard(Array(16).fill(""))), false);
  assertEquals(checkGameOver(Array(16).fill(2)), false);
  assertEquals(
    checkGameOver(
      [...generateEmptyArr(11), 2, ...generateEmptyArr(3), 2],
    ),
    false,
  );
  assertEquals(
    checkGameOver(
      [
        8,
        4,
        2,
        4,
        "",
        4,
        2,
        32,
        "",
        "",
        2,
        4,
        ...generateEmptyArr(4),
      ],
    ),
    false,
  );

  assertEquals(
    checkGameOver(
      [2, 32, 8, 4, 4, 2, 16, 2, 16, 64, 32, 4, 4, 2, 4, 16],
    ),
    true,
  );
});

Deno.test("test getTwoPosition", () => {
  const { first, second } = getTwoPosition();
  assertNotEquals(first.join(""), second.join(""));
});

Deno.test("test initBoard", () => {
  const board = initBoard(Array(16).fill(""));

  assertEquals(board.length, 16);
  assertEquals(board.filter((v) => !!v).length, 2);
});

Deno.test("test calculateRow", () => {
  assertEquals(calculateRow(["", "", "", ""]).join(""), "");

  assertEquals(calculateRow([2, "", "", ""]).at(0), 2);
  assertEquals(calculateRow([2, "", "", ""]).join(""), "2");
  assertEquals(calculateRow(["", 2, "", ""]).at(0), 2);
  assertEquals(calculateRow(["", 2, "", ""]).join(""), "2");
  assertEquals(calculateRow(["", "", 2, ""]).at(0), 2);
  assertEquals(calculateRow(["", "", 2, ""]).join(""), "2");
  assertEquals(calculateRow(["", "", "", 2]).at(0), 2);
  assertEquals(calculateRow(["", "", "", 2]).join(""), "2");

  assertEquals(calculateRow([2, 2, "", ""]).at(0), 4);
  assertEquals(calculateRow([2, 2, "", ""]).join(""), "4");
  assertEquals(calculateRow([2, "", 2, ""]).at(0), 4);
  assertEquals(calculateRow([2, "", 2, ""]).join(""), "4");
  assertEquals(calculateRow([2, "", "", 2]).at(0), 4);
  assertEquals(calculateRow([2, "", "", 2]).join(""), "4");
  assertEquals(calculateRow(["", 2, 2, ""]).at(0), 4);
  assertEquals(calculateRow(["", 2, 2, ""]).join(""), "4");
  assertEquals(calculateRow(["", "", 2, 2]).at(0), 4);
  assertEquals(calculateRow(["", "", 2, 2]).join(""), "4");

  assertEquals(calculateRow([2, 4, "", ""]).at(0), 2);
  assertEquals(calculateRow([2, 4, "", ""]).at(1), 4);
  assertEquals(calculateRow([2, 4, "", ""]).join(""), "24");
  assertEquals(calculateRow([2, "", 4, ""]).at(0), 2);
  assertEquals(calculateRow([2, "", 4, ""]).at(1), 4);

  assertEquals(calculateRow([4, "", "", 2]).at(0), 4);
  assertEquals(calculateRow([4, "", "", 2]).at(1), 2);
  assertEquals(calculateRow([4, "", "", 2]).join(""), "42");
  assertEquals(calculateRow(["", 4, "", 2]).at(0), 4);
  assertEquals(calculateRow(["", 4, "", 2]).at(1), 2);
  assertEquals(calculateRow(["", 4, "", 2]).join(""), "42");
  assertEquals(calculateRow(["", "", 4, 2]).at(0), 4);
  assertEquals(calculateRow(["", "", 4, 2]).at(1), 2);
  assertEquals(calculateRow(["", "", 4, 2]).join(""), "42");

  assertEquals(calculateRow([2, 2, 2, ""]).at(0), 4);
  assertEquals(calculateRow([2, 2, 2, ""]).at(1), 2);
  assertEquals(calculateRow([2, 2, 2, ""]).at(2), "");
  assertEquals(calculateRow([2, "", 2, 2]).at(0), 4);
  assertEquals(calculateRow([2, "", 2, 2]).at(1), 2);
  assertEquals(calculateRow([2, "", 2, 2]).at(2), "");

  assertEquals(calculateRow([2, 2, 4, ""]).at(0), 4);
  assertEquals(calculateRow([2, 2, 4, ""]).at(1), 4);
  assertEquals(calculateRow([2, 2, 4, ""]).at(2), "");
  assertEquals(calculateRow([2, 2, 4, ""]).at(3), "");

  assertEquals(calculateRow([2, "", 2, 4]).at(0), 4);
  assertEquals(calculateRow([2, "", 2, 4]).at(1), 4);
  assertEquals(calculateRow([2, "", 2, 4]).at(2), "");
  assertEquals(calculateRow([2, "", 2, 4]).at(3), "");

  assertEquals(calculateRow([4, 2, 2, ""]).at(0), 4);
  assertEquals(calculateRow([4, 2, 2, ""]).at(1), 4);
  assertEquals(calculateRow([4, 2, 2, ""]).at(2), "");
  assertEquals(calculateRow([4, 2, 2, ""]).at(3), "");

  assertEquals(calculateRow([4, 2, "", 2]).at(0), 4);
  assertEquals(calculateRow([4, 2, "", 2]).at(1), 4);
  assertEquals(calculateRow([4, 2, "", 2]).at(2), "");
  assertEquals(calculateRow([4, 2, "", 2]).at(3), "");

  assertEquals(calculateRow([2, 4, 2, ""]).at(0), 2);
  assertEquals(calculateRow([2, 4, 2, ""]).at(1), 4);
  assertEquals(calculateRow([2, 4, 2, ""]).at(2), 2);
  assertEquals(calculateRow([2, 4, 2, ""]).at(3), "");

  assertEquals(calculateRow([2, "", 4, 2]).at(0), 2);
  assertEquals(calculateRow([2, "", 4, 2]).at(1), 4);
  assertEquals(calculateRow([2, "", 4, 2]).at(2), 2);
  assertEquals(calculateRow([2, "", 4, 2]).at(3), "");

  assertEquals(calculateRow([2, "", 4, 8]).at(0), 2);
  assertEquals(calculateRow([2, "", 4, 8]).at(1), 4);
  assertEquals(calculateRow([2, "", 4, 8]).at(2), 8);
  assertEquals(calculateRow([2, "", 4, 8]).at(3), "");

  assertEquals(calculateRow([2, 2, 2, 2]).at(0), 4);
  assertEquals(calculateRow([2, 2, 2, 2]).at(1), 4);
  assertEquals(calculateRow([2, 2, 2, 2]).at(2), "");
  assertEquals(calculateRow([2, 2, 2, 2]).at(3), "");

  assertEquals(calculateRow([2, 2, 4, 8]).at(0), 4);
  assertEquals(calculateRow([2, 2, 4, 8]).at(1), 4);
  assertEquals(calculateRow([2, 2, 4, 8]).at(2), 8);
  assertEquals(calculateRow([2, 2, 4, 8]).at(3), "");

  assertEquals(calculateRow([4, 2, 2, 8]).at(0), 4);
  assertEquals(calculateRow([4, 2, 2, 8]).at(1), 4);
  assertEquals(calculateRow([4, 2, 2, 8]).at(2), 8);
  assertEquals(calculateRow([4, 2, 2, 8]).at(3), "");

  assertEquals(calculateRow([4, 8, 2, 2]).at(0), 4);
  assertEquals(calculateRow([4, 8, 2, 2]).at(1), 8);
  assertEquals(calculateRow([4, 8, 2, 2]).at(2), 4);
  assertEquals(calculateRow([4, 8, 2, 2]).at(3), "");

  assertEquals(calculateRow([4, 2, 8, 2]).at(0), 4);
  assertEquals(calculateRow([4, 2, 8, 2]).at(1), 2);
  assertEquals(calculateRow([4, 2, 8, 2]).at(2), 8);
  assertEquals(calculateRow([4, 2, 8, 2]).at(3), 2);

  assertEquals(calculateRow([2, 2, 4, 4]).at(0), 4);
  assertEquals(calculateRow([2, 2, 4, 4]).at(1), 8);
  assertEquals(calculateRow([2, 2, 4, 4]).at(2), "");
  assertEquals(calculateRow([2, 2, 4, 4]).at(3), "");

  assertEquals(calculateRow([2, 4, 2, 4]).at(0), 2);
  assertEquals(calculateRow([2, 4, 2, 4]).at(1), 4);
  assertEquals(calculateRow([2, 4, 2, 4]).at(2), 2);
  assertEquals(calculateRow([2, 4, 2, 4]).at(3), 4);

  assertEquals(calculateRow([2, 4, 4, 2]).at(0), 2);
  assertEquals(calculateRow([2, 4, 4, 2]).at(1), 8);
  assertEquals(calculateRow([2, 4, 4, 2]).at(2), 2);
  assertEquals(calculateRow([2, 4, 4, 2]).at(3), "");

  assertEquals(calculateRow([2, 2, 2, 4]).at(0), 4);
  assertEquals(calculateRow([2, 2, 2, 4]).at(1), 2);
  assertEquals(calculateRow([2, 2, 2, 4]).at(2), 4);
  assertEquals(calculateRow([2, 2, 2, 4]).at(3), "");

  assertEquals(calculateRow([4, 2, 2, 2]).at(0), 4);
  assertEquals(calculateRow([4, 2, 2, 2]).at(1), 4);
  assertEquals(calculateRow([4, 2, 2, 2]).at(2), 2);
  assertEquals(calculateRow([4, 2, 2, 2]).at(3), "");

  assertEquals(calculateRow([4, 2, 8, 16]).at(0), 4);
  assertEquals(calculateRow([4, 2, 8, 16]).at(1), 2);
  assertEquals(calculateRow([4, 2, 8, 16]).at(2), 8);
  assertEquals(calculateRow([4, 2, 8, 16]).at(3), 16);
});

Deno.test("test moveToTop #1", () => {
  let board = [...generateEmptyArr(11), 2, ...generateEmptyArr(3), 2];

  board = moveToTop(board);
  assertEquals(board.at(0), "");
  assertEquals(board.at(3), 4);
});

Deno.test("test moveToTop #2", () => {
  let board = [2, ...generateEmptyArr(2), 4, ...generateEmptyArr(12)];

  board = moveToTop(board);
  assertEquals(board.at(0), 2);
  assertEquals(board.at(3), 4);
});

Deno.test("test moveToTop #3", () => {
  let board = ["", "", "", 2, "", 2, "", 2, "", "", 2, 8, "", 4, 2, 4];

  board = moveToTop(board);
  assertEquals(board.at(0), "");
  assertEquals(board.at(1), 2);
  assertEquals(board.at(2), 4);
  assertEquals(board.at(3), 4);
  assertEquals(board.at(4), "");
  assertEquals(board.at(5), 4);
  assertEquals(board.at(6), "");
  assertEquals(board.at(7), 8);
  assertEquals(board.at(8), "");
  assertEquals(board.at(11), 4);
});

Deno.test("test moveToBottom #1", () => {
  let board = [
    ...generateEmptyArr(3),
    2,
    ...generateEmptyArr(4),
    2,
    ...generateEmptyArr(7),
  ];

  board = moveToBottom(board);
  assertEquals(board.at(0), "");
  assertEquals(board.at(3), "");
  assertEquals(board.at(8), "");
  assertEquals(board.at(12), 2);
  assertEquals(board.at(15), 2);
});

Deno.test("test moveToBottom #2", () => {
  let board = [
    8,
    4,
    2,
    4,
    "",
    4,
    2,
    32,
    "",
    "",
    2,
    4,
    ...generateEmptyArr(4),
  ];

  board = moveToBottom(board);
  assertEquals(board.at(0), "");
  assertEquals(board.at(1), "");
  assertEquals(board.at(2), "");
  assertEquals(board.at(3), "");
  assertEquals(board.at(7), 4);
  assertEquals(board.slice(12, 16).join(""), "8844");
});

Deno.test("test moveToLeft #1", () => {
  let board = [
    ...generateEmptyArr(3),
    2,
    ...generateEmptyArr(11),
    2,
  ];

  board = moveToLeft(board);
  assertEquals(board.at(0), 2);
  assertEquals(board.at(3), "");
  assertEquals(board.at(12), 2);
});

Deno.test("test moveToLeft #2", () => {
  let board = [
    "",
    2,
    "",
    2,
    "",
    8,
    8,
    16,
    "",
    4,
    4,
    2,
    "",
    2,
    64,
    16,
  ];

  board = moveToLeft(board);
  assertEquals(board.at(0), 4);
  assertEquals(board.at(4), 16);
  assertEquals(board.at(5), 16);
  assertEquals(board.at(8), 8);
  assertEquals(board.at(11), "");
  assertEquals(board.at(15), "");
});

Deno.test("test moveToRight #1", () => {
  let board = [
    4,
    "",
    "",
    "",
    16,
    16,
    "",
    "",
    8,
    2,
    2,
    "",
    2,
    64,
    16,
    "",
  ];

  board = moveToRight(board);
  assertEquals(board.at(0), "");
  assertEquals(board.at(3), 4);
  assertEquals(board.at(7), 32);
  assertEquals(board.at(10), 8);
  assertEquals(board.at(14), 64);
});
