// https://deno.land/std@0.151.0/testing
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.151.0/testing/asserts.ts";
import { getTwoPosition, initBoard } from "./utils.ts";

Deno.test("test getTwoPosition", () => {
  const { first, second } = getTwoPosition();
  assertNotEquals(first.join(""), second.join(""));
});

Deno.test("test initBoard", () => {
  const board = initBoard(Array(16).fill(""));

  assertEquals(board.length, 16);
  assertEquals(board.filter((v) => !!v).length, 2);
});

Deno.test("test printBoard", () => {});

Deno.test("test main", () => {});
