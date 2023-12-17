import * as fs from "fs/promises";

let input = `30373
25512
65332
33549
35390`;
try {
  const filePath = new URL("./input.txt", import.meta.url);

  console.log("the meta url", import.meta.url);
  input = await fs.readFile(filePath, { encoding: "utf-8" });
  //   console.log(input);
  input.trim();
} catch (error) {
  console.error(error);
}
let splitInput = (processInput) =>
  processInput
    .trim()
    .split("\n")
    .map((ele) => ele.trim())
    .map((ele) => ele.split("").map((ele) => Number(ele)));

// console.log(splitInput(input));

let turnColumnToFlatRow = (input, colIndex) => {
  return input.map((row) => row[colIndex]);
};
console.log(turnColumnToFlatRow(splitInput(input), 0));
let testRow = (aRow, currentElement, currentRowIndex) => {
  let resultLeft = true;
  let resultRight = true;
  //   testing to the left
  for (let i = 0; i < currentRowIndex; i++) {
    if (i == currentRowIndex) continue;
    if (aRow[i] >= currentElement) {
      resultLeft = false;
      break;
    }
  }
  //   testing to the right
  for (let i = currentRowIndex + 1; i < aRow.length; i++) {
    if (i == currentRowIndex) continue;
    if (aRow[i] >= currentElement) {
      resultRight = false;
      break;
    }
  }

  return resultRight || resultLeft;
};
let testRow2 = (aRow, currentElement, currentRowIndex) => {
  let resultLeft = true;
  let resultRight = true;
  //   testing to the left
  let visibilityLeft = 0;
  for (let i = currentRowIndex; i >= 0; i--) {
    if (i == currentRowIndex) continue;
    visibilityLeft++;
    if (aRow[i] >= currentElement) {
      resultLeft = false;
      break;
    }
  }
  //   testing to the right
  let visibilityRight = 0;
  for (let i = currentRowIndex + 1; i < aRow.length; i++) {
    if (i == currentRowIndex) continue;
    visibilityRight++;
    if (aRow[i] >= currentElement) {
      resultRight = false;
      break;
    }
  }

  return visibilityLeft * visibilityRight;
};

let testCollumn = (aColumn, currentElement, currentCollumnIndex) => {
  let result = false;
};

let processParsedInput = (input) => {
  let lastInRow = input[0].length - 1;
  let lastBottom = input.length - 1;

  let visibleCount = 0;

  //   check row

  for (let rowIndex = 1; rowIndex < lastBottom; rowIndex++) {
    for (let collumnIndex = 1; collumnIndex < lastInRow; collumnIndex++) {
      const testElement = input[rowIndex][collumnIndex];
      let visibleInRow = testRow(input[rowIndex], testElement, collumnIndex);
      let visible = testRow(
        turnColumnToFlatRow(input, collumnIndex),
        input[rowIndex][collumnIndex],
        rowIndex
      );

      if (visibleInRow || visible) visibleCount++;
    }
  }
  return (
    visibleCount +
    input[0].length * 2 +
    turnColumnToFlatRow(input, 0).length * 2 -
    4
  );
  //   console.log(input[0].length);

  //   return visibleCount;
};

let processParsedInput2 = (input) => {
  let lastInRow = input[0].length;
  let lastBottom = input.length;

  let highestVisiblityScore = 0;

  //   check row

  for (let rowIndex = 0; rowIndex < lastBottom; rowIndex++) {
    for (let collumnIndex = 0; collumnIndex < lastInRow; collumnIndex++) {
      const testElement = input[rowIndex][collumnIndex];
      let visibilityInRow = testRow2(
        input[rowIndex],
        testElement,
        collumnIndex
      );
      let visibilityInCollumn = testRow2(
        turnColumnToFlatRow(input, collumnIndex),
        input[rowIndex][collumnIndex],
        rowIndex
      );
      let visibilityScore = visibilityInCollumn * visibilityInRow;
      if (highestVisiblityScore < visibilityScore) {
        highestVisiblityScore = visibilityScore;
      }
    }
  }
  return highestVisiblityScore;
  //   console.log(input[0].length);

  //   return visibleCount;
};

console.log(processParsedInput(splitInput(input)));

console.log(processParsedInput2(splitInput(input)));
