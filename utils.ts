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

/**
 * 打印棋盘
 * @param board
 */
export function printBoard(board: number[]) {
  console.table([
    board.slice(0, 4),
    board.slice(4, 8),
    board.slice(8, 12),
    board.slice(12, 16),
  ]);
}

function getValidNumCount(arr: number[]) {
  return [...new Set(arr)].filter((item) => !!item).length;
}

function hasEmpty(arr: number[]) {
  return arr.some((item) => !item);
}

function distinctElemCount(arr: number[]) {
  return new Set(arr).size;
}

function calculateRow(columns: number[]) {
  const COL_LENGTH = columns.length;
  if (columns.join("") === "") {
    // 每个格子都是空的
    return columns;
  } else if (getValidNumCount(columns) === 1) {
    // 只有一个数字 eg [2, '', '', '']
    return [
      Math.max(...columns),
      ...Array.from({ length: COL_LENGTH - 1 }, () => ""),
    ];
  } else if (getValidNumCount(columns) === 2) {
    // 有两个数字
    if (distinctElemCount(columns) === 2) {
      // 如果两个数字相同 eg: [2, 2, '', ''], ['', 2, '', 2]
      const sum = columns.filter((v) => !!v).reduce((a, b) => a + b);
      return [sum, ...Array.from({ length: COL_LENGTH - 1 }, () => "")];
    } else {
      // 如果两个数字不同 eg: [2, 4, '', ''], [2, '', 4, '']
      return [
        ...columns.filter((v) => !!v),
        ...Array.from({ length: COL_LENGTH - 2 }, () => ""),
      ];
    }
  } else if (getValidNumCount(columns) === 3) {
    // 有三个数字

    // 三个数字都相同 eg: [2, 2, 2, ''], ['', 2, 2, 2], [2, 2, '', 2], [2, '', 2, 2]

    // 三个数字有2个相同 eg: [2, 2, 4, ''], [4, 2, 2, ''], [2, 4, '', 2], ['', 2, 2, 4]

    // 三个数字都不相同 eg [2, 4, 8, '']
  } else if (getValidNumCount(columns) === COL_LENGTH) {
    // 有四个数字
  }
}

function moveToTop(arr: number[]) {
}

function moveToBottom(columns: number[]) {
}

function moveToLeft(columns: number[]) {
}

function moveToRight(columns: number[]) {
}
