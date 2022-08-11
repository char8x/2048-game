export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 * 获取两个随机位置, 并且不会重复
 * @returns
 */
export function getTwoPosition(): { first: number[]; second: number[] } {
  const postions = Array.from(
    { length: 16 },
    (_, i) => `${Math.floor(i / 4)}${i % 4}`,
  );
  const [first] = postions.splice(
    getRandomIntInclusive(0, postions.length - 1),
    1,
  );
  const [second] = postions.splice(
    getRandomIntInclusive(0, postions.length - 1),
    1,
  );
  return {
    first: first.split("").map(Number),
    second: second.split("").map(Number),
  };
}

export function getEmptyPositions(arr: Array<number | string>) {
  return arr.reduce((acc, item, index) => {
    if (!item) {
      acc.push(index);
    }
    return acc;
  }, [] as Array<number>);
}

export function setNewNumber(board: Array<number | string>) {
  const newBoard = board.slice();
  const emptyPositions = getEmptyPositions(board);
  if (emptyPositions.length === 0) {
    return board;
  }
  const randomPosition =
    emptyPositions[getRandomIntInclusive(0, emptyPositions.length - 1)];
  newBoard[randomPosition] = getRandomIntInclusive(0, 10) > 7 ? 4 : 2;
  return newBoard;
}

/**
 * 初始化棋盘，2 - 2（70%） , 2 - 4（20%）, 4 - 4（10%）
 */
export function initBoard(board: number[]) {
  const num = getRandomIntInclusive(1, 10);
  const { first, second } = getTwoPosition();
  if (num === 10) {
    // 4 - 4
    board[first[0] * 4 + first[1]] = 4;
    board[second[0] * 4 + second[1]] = 4;
  } else if (num === 8 || num === 9) {
    // 2 - 4
    board[first[0] * 4 + first[1]] = 2;
    board[second[0] * 4 + second[1]] = 4;
  } else {
    // 2 - 2
    board[first[0] * 4 + first[1]] = 2;
    board[second[0] * 4 + second[1]] = 2;
  }
  return board;
}

const COLOR_MAP: Record<number, string> = {
  2: "color: #776e65; background-color: #eee4da",
  4: "color: #776e65; background-color: #eee1c9",
  8: "color: #f9f6f2; background-color: #f3b27a",
  16: "color: #f9f6f2;background-color: #f69664",
  32: "color: #f9f6f2;background-color: #f77c5f",
  64: "color: #f9f6f2;background-color: #f75f3b",
  128: "color: #f9f6f2; background-color: #edd073",
  256: "color: #f9f6f2; background-color: #edcc62",
  512: "color: #f9f6f2; background-color: #edc950",
  1024: "color:#f9f6f2; background-color: #edc53f",
  2014: "color:#f9f6f2; background-color: #edc22e",
};

function generateConsoleColors(arr: Array<number | string>) {
  return arr.map((item) => {
    if (!item) return "background-color: #faf8ef";
    return `${COLOR_MAP[item as number]}`;
  });
}

function generateConsoleOutput(arr: Array<number | string>) {
  return arr.map((item) => {
    if (!item) return "%c''";
    return `%c${item}`;
  }).join(" ");
}

function consoleLog(arr: Array<number | string>) {
  console.log(
    generateConsoleOutput(arr),
    ...generateConsoleColors(arr),
  );
}

/**
 * 打印棋盘
 * @param board
 */
export function printBoard(board: Array<number | string>) {
  consoleLog(board.slice(0, 4));
  consoleLog(board.slice(4, 8));
  consoleLog(board.slice(8, 12));
  consoleLog(board.slice(12, 16));
}

function getValidNumCount(arr: Array<number | string>) {
  return arr.filter((item) => !!item).length;
}

function isBoardFull(arr: Array<number | string>) {
  return arr.every((item) => !!item);
}

function nonEmptyDistinctElemCount(arr: Array<number | string>) {
  return [...new Set(arr)].filter((item) => !!item).length;
}

function nonEmptyDistinctElem(arr: Array<number | string>): number {
  // @ts-ignore
  return [...new Set(arr)].find((item) => !!item);
}

function distinctElemCount(arr: Array<number | string>) {
  return new Set(arr).size;
}

export function generateEmptyArr(length: number) {
  return Array.from({ length }, () => "");
}

/**
 * 计算移动后的数据
 * @param columns
 * @returns
 */
export function calculateRow(
  columns: Array<number | string>,
): Array<number | string> {
  const COL_LENGTH = columns.length;
  if (columns.join("") === "") {
    // 每个格子都是空的
    return columns;
  } else if (getValidNumCount(columns) === 1) {
    // 只有一个数字 eg [2, '', '', '']
    return [
      // @ts-ignore
      Math.max(...columns),
      ...generateEmptyArr(COL_LENGTH - 1),
    ];
  } else if (getValidNumCount(columns) === 2) {
    // 有两个数字
    if (nonEmptyDistinctElemCount(columns) === 1) {
      // 如果两个数字相同 eg: [2, 2, '', ''], ['', 2, '', 2]
      // @ts-ignore
      const sum = columns.filter((v) => !!v).reduce((a, b) => a + b);
      return [sum, ...generateEmptyArr(COL_LENGTH - 1)];
    } else {
      // 如果两个数字不同 eg: [2, 4, '', ''], [2, '', 4, '']
      return [
        ...columns.filter((v) => !!v),
        ...generateEmptyArr(COL_LENGTH - 2),
      ];
    }
  } else if (getValidNumCount(columns) === 3) {
    // 有三个数字
    if (nonEmptyDistinctElemCount(columns) === 1) {
      // 三个数字都相同 eg: [2, 2, 2, ''], ['', 2, 2, 2], [2, 2, '', 2], [2, '', 2, 2]
      const elem = nonEmptyDistinctElem(columns);
      return [
        elem + elem,
        elem,
        ...generateEmptyArr(COL_LENGTH - 2),
      ];
    } else if (nonEmptyDistinctElemCount(columns) === 2) {
      // 三个数字有2个相同
      const nums = columns.filter((v) => !!v);
      if (nums[0] === nums[1]) {
        // case1 相同数字相邻  eg: [2, 2, 4, ''], ['', 2, 2, 4]
        // case2 相同数字间隔‘’ eg: [2, '', 2, 4]
        return [
          // @ts-ignore
          nums[0] + nums[1],
          nums[2],
          ...generateEmptyArr(COL_LENGTH - 2),
        ];
      } else if (nums[1] === nums[2]) {
        // case1 相同数字相邻  eg:  [4, 2, 2, ''],  ['', 4, 2, 2], [4, '', 2, 2],
        // case2 相同数字间隔‘’ eg:  [4, 2, '', 2]
        return [
          nums[0],
          // @ts-ignore
          nums[1] + nums[2],
          ...generateEmptyArr(COL_LENGTH - 2),
        ];
      } else {
        // 相同数字不相邻 eg: [2,4,2, ''], [2, '', 4, 2]
        return nums.concat("");
      }
    } else {
      // 三个数字都不相同 eg [2, 4, 8, '']
      return columns.filter((v) => !!v).concat("");
    }
  } else if (getValidNumCount(columns) === COL_LENGTH) {
    // 有四个数字
    if (distinctElemCount(columns) === 1) {
      // 四个数字都相同 eg: [2, 2, 2, 2]
      // @ts-ignore
      const sum = columns[0] + columns[0];
      return [sum, sum, ...generateEmptyArr(COL_LENGTH - 2)];
    } else if (distinctElemCount(columns) === 3) {
      if (columns[0] === columns[1]) {
        // 四个数字有2个相同 eg: [2, 2, 4, 8]
        // @ts-ignore
        return [columns[0] + columns[1], columns[2], columns[3], ""];
      } else if (columns[1] === columns[2]) {
        // 四个数字有2个相同 eg: [4, 2, 2, 8]
        // @ts-ignore
        return [columns[0], columns[1] + columns[2], columns[3], ""];
      } else if (columns[2] === columns[3]) {
        // 四个数字有2个相同 eg: [4, 8, 2, 2]
        // @ts-ignore
        return [columns[0], columns[1], columns[2] + columns[3], ""];
      }
      return columns;
    } else if (distinctElemCount(columns) === 2) {
      if (columns[0] === columns[1] && columns[2] === columns[3]) {
        // 四个数字两两相同 eg: [2,2,4,4]
        // @ts-ignore
        return [columns[0] + columns[1], columns[2] + columns[3], "", ""];
      } else if (columns[0] === columns[2] && columns[1] === columns[3]) {
        // 四个数字两两相同 eg: [2,4,2,4]
        return columns;
      } else if (columns[0] === columns[3] && columns[1] === columns[2]) {
        // 四个数字两两相同 eg: [2,4,4,2]
        // @ts-ignore
        return [columns[0], columns[1] + columns[2], columns[3], ""];
      } else if (columns[0] === columns[1]) {
        // 有3个数字相同 eg: [2,2,2,4], [2,2,4,2]
        // @ts-ignore
        return [columns[0] + columns[1], columns[2], columns[3], ""];
      } else if (columns[1] === columns[2]) {
        // 有3个数字相同 eg: [4,2,2,2]
        // @ts-ignore
        return [columns[0], columns[1] + columns[2], columns[3], ""];
      }
    }

    // 四个数字都不相同
    return columns;
  }

  return columns;
}

/**
 * 向上移动
 * @param arr
 * @returns
 */
export function moveToTop(arr: Array<number | string>) {
  const board = Array(16).fill("");
  [board[0], board[4], board[8], board[12]] = calculateRow(
    arr.filter((_, i) => i % 4 === 0),
  );
  [board[1], board[5], board[9], board[13]] = calculateRow(
    arr.filter((_, i) => i % 4 === 1),
  );
  [board[2], board[6], board[10], board[14]] = calculateRow(
    arr.filter((_, i) => i % 4 === 2),
  );
  [board[3], board[7], board[11], board[15]] = calculateRow(
    arr.filter((_, i) => i % 4 === 3),
  );
  return board;
}

/**
 * 向下移动
 * @param arr
 * @returns
 */
export function moveToBottom(arr: Array<number | string>) {
  const board = Array(16).fill("");
  [board[0], board[4], board[8], board[12]] = calculateRow(
    arr.filter((_, i) => i % 4 === 0).reverse(),
  ).reverse();
  [board[1], board[5], board[9], board[13]] = calculateRow(
    arr.filter((_, i) => i % 4 === 1).reverse(),
  ).reverse();
  [board[2], board[6], board[10], board[14]] = calculateRow(
    arr.filter((_, i) => i % 4 === 2).reverse(),
  ).reverse();
  [board[3], board[7], board[11], board[15]] = calculateRow(
    arr.filter((_, i) => i % 4 === 3).reverse(),
  ).reverse();
  return board;
}

/**
 * 向左移动
 * @param arr
 * @returns
 */
export function moveToLeft(arr: Array<number | string>) {
  const board = Array(16).fill("");
  [board[0], board[1], board[2], board[3]] = calculateRow(
    arr.slice(0, 4),
  );
  [board[4], board[5], board[6], board[7]] = calculateRow(
    arr.slice(4, 8),
  );
  [board[8], board[9], board[10], board[11]] = calculateRow(
    arr.slice(8, 12),
  );
  [board[12], board[13], board[14], board[15]] = calculateRow(
    arr.slice(12, 16),
  );
  return board;
}

/**
 * 向右移动
 * @param arr
 * @returns
 */
export function moveToRight(arr: Array<number | string>) {
  const board = Array(16).fill("");
  [board[0], board[1], board[2], board[3]] = calculateRow(
    arr.slice(0, 4).reverse(),
  ).reverse();
  [board[4], board[5], board[6], board[7]] = calculateRow(
    arr.slice(4, 8).reverse(),
  ).reverse();
  [board[8], board[9], board[10], board[11]] = calculateRow(
    arr.slice(8, 12).reverse(),
  ).reverse();
  [board[12], board[13], board[14], board[15]] = calculateRow(
    arr.slice(12, 16).reverse(),
  ).reverse();
  return board;
}

/**
 * 是否包含相邻且相同的数字
 * @param arr
 */
export function hasSameNumberNearby(arr: Array<number | string>) {
  if (!Array.isArray(arr) || arr.length === 0 || arr.length === 1) {
    return false;
  }
  let i = 0, j = 1;
  for (; i < arr.length - 1; i++, j++) {
    if (arr[i] === arr[j]) {
      return true;
    }
  }
  return false;
}

/**
 * 检查是否游戏结束
 * @param board
 * @returns
 */
export function checkGameOver(board: Array<number | string>) {
  if (!isBoardFull(board)) {
    return false;
  }

  return [
    hasSameNumberNearby(board.slice(0, 4)),
    hasSameNumberNearby(board.slice(4, 8)),
    hasSameNumberNearby(board.slice(8, 12)),
    hasSameNumberNearby(board.slice(12, 16)),
    hasSameNumberNearby(board.filter((_, i) => i % 4 === 0)),
    hasSameNumberNearby(board.filter((_, i) => i % 4 === 1)),
    hasSameNumberNearby(board.filter((_, i) => i % 4 === 2)),
    hasSameNumberNearby(board.filter((_, i) => i % 4 === 3)),
  ].every((item) => item === false);
}

export function checkWin(board: Array<string | number>) {
  return board.find((v) => v === 2048) != undefined;
}
