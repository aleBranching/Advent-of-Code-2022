import { getInput, splitLines } from "../utils/index.js";

import * as fs from "fs/promises";

let input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

input = ``;
try {
  const filePath = new URL("./input.txt", import.meta.url);

  console.log("the meta url", import.meta.url);
  input = await fs.readFile(filePath, { encoding: "utf-8" });
  input.trim();
} catch (error) {
  console.error(error);
}

let properlySeperate = (input) =>
  input.split(",").map((el) => el.split("-").map(Number));

let checkHighAndLows = (input) => {
  let firstLow = input[0][0];
  let firstHigh = input[0][1];

  let secondLow = input[1][0];
  let secondHigh = input[1][1];

  if (firstLow <= secondLow && firstHigh >= secondHigh) return true;
  else if (secondLow <= firstLow && secondHigh >= firstHigh) {
    return true;
  } else return false;
};

let overlapAtAll = ([a, b]) => {
  let firstLow = input[0][0];
  let firstHigh = input[0][1];

  let secondLow = input[1][0];
  let text = `
  ..5678...
  ....2345.....
  `;
  let secondHigh = input[1][1];

  if (a[0] <= b[1] && a[1] >= b[0]) return true;
  else if (a[1] <= b[0] && b[0] <= a[1]) return true;
  else return false;
};
console.log(
  splitLines(input).map(properlySeperate).filter(checkHighAndLows).length
);

console.log(
  splitLines(input).map(properlySeperate).filter(overlapAtAll).length
);
