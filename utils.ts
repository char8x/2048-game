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

function getValidNumCount(arr: Array<number | string>) {
  return arr.filter((item) => !!item).length;
}

function hasEmpty(arr: Array<number | string>) {
  return arr.some((item) => !item);
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

function generateEmptyArr(length: number) {
  return Array.from({ length }, () => "");
}

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

function moveToTop(arr: number[]) {
}

function moveToBottom(columns: number[]) {
}

function moveToLeft(columns: number[]) {
}

function moveToRight(columns: number[]) {
}
