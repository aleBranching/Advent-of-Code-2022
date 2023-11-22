import * as fs from "fs/promises";
import { Stack } from "../utils/index.js";
import { SlowBuffer } from "buffer";

let input = ``;
try {
  const filePath = new URL("./input.txt", import.meta.url);

  input = await fs.readFile(filePath, { encoding: "utf-8" });
  input.trim();
} catch (error) {
  console.error(error);
}

input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

let cleanUpCrates = (aLineOfCrates) => {
  let regEx = /[\[\]]+/g;

  let cleaned = aLineOfCrates.trim().replace(regEx, "");
  cleaned = cleaned == "" ? null : cleaned;
  return cleaned;
};

let putIntoStacks = (cleanUpCrates) => {
  let organized = Array(cleanUpCrates[0].length)
    .fill()
    .map((ele) => new Stack());

  cleanUpCrates.forEach((aLine, i) => {
    aLine.forEach((aStack, i) => {
      if (aStack) organized[i].push(aStack);
    });
  });

  return organized;
};

let parseCrates = (rawCrates) => {
  let splitCrates = rawCrates.split("\n");

  splitCrates = splitCrates.slice(1).reverse().slice(1);
  let splitCratesInLevelsClean = splitCrates.map((line) => {
    let grouped = [];
    for (let i = 0; i < line.length; i += 4) {
      grouped.push(line.slice(i, i + 4));
    }
    return grouped.map(cleanUpCrates);
  });

  return putIntoStacks(splitCratesInLevelsClean);
};

let parseRawMoves = (rawMoves) => {
  console.log("rawMocces", rawMoves.trim().split("\n"));
  let splitted = rawMoves.trim().split("\n");
  let parseLine = (aString) => {
    let regEx = /move (?<moves>\d+) from (?<from>\d+) to (?<to>\d+)/i;
    let match = aString.match(regEx);
    console.log(match);
  };
  splitted.map(parseLine);
};

let parseInput = (input) => {
  let [rawCrates, rawMoves] = input.split("\n\n");

  parseCrates(rawCrates);
  console.log(parseCrates(rawCrates));
  parseRawMoves(rawMoves);
};

parseInput(input);
