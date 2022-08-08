// https://deno.land/std@0.151.0/testing
import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.151.0/testing/asserts.ts";
import { calculateRow, getTwoPosition, initBoard } from "./utils.ts";

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

Deno.test("test main", () => {
});
