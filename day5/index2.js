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

// input = `
//     [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2
// `;

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
      if (aStack !== null) organized[i].push(aStack);
    });
  });

  console.log("properCrates", organized);
  return organized;
};

let parseCrates = (rawCrates) => {
  let splitCrates = rawCrates.split("\n");

  splitCrates = splitCrates.reverse().slice(1);
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
  let splitted = rawMoves.trim().split("\n");
  let organizedMoves = [];
  let parseLine = (aString) => {
    let regEx = /move (?<moves>\d+) from (?<from>\d+) to (?<to>\d+)/i;
    let match = aString.match(regEx);
    organizedMoves.push({
      moves: match.groups.moves - 0,
      from: match.groups.from - 1,
      to: match.groups.to - 1,
    });
  };
  splitted.map(parseLine);
  return organizedMoves;
};

let makeMoves = (parsedCrates, parsedMoves) => {
  parsedMoves.forEach((elem) => {
    // console.log("before: ");
    // console.log("elem", parsedCrates);
    for (let i = 0; i < elem.moves; i++) {
      let popped = parsedCrates[elem.from].pop();
      parsedCrates[elem.to].push(popped);
    }

    // console.log("after: ");
    // console.log("elem", parsedCrates);
  });
};

let makeMoves9001 = (parsedCrates, parsedMoves) => {
  parsedMoves.forEach((elem) => {
    // console.log("before: ");
    // console.log("elem", parsedCrates);
    let popped = [];

    for (let i = 0; i < elem.moves; i++) {
      popped.push(parsedCrates[elem.from].pop());
    }
    popped.reverse();
    popped.forEach((ele) => parsedCrates[elem.to].push(ele));

    // console.log("after: ");
    // console.log("elem", parsedCrates);
  });
};

let parseInput = (input) => {
  let [rawCrates, rawMoves] = input.split("\n\n");

  let parsedCrates = parseCrates(rawCrates);
  let parsedMoves = parseRawMoves(rawMoves);
  // console.log(parsedCrates);
  // console.log(parsedMoves);
  return [parsedCrates, parsedMoves];
};

let start9000 = (input) => {
  let [parsedCrates, parsedMoves] = parseInput(input);
  makeMoves(parsedCrates, parsedMoves);
  console.log(
    parsedCrates
      .map((ele) => ele.peek())
      .reduce((prev, current) => prev.concat(current), "Moves 9000: ")
  );
};

let start9001 = (input) => {
  let [parsedCrates, parsedMoves] = parseInput(input);
  makeMoves9001(parsedCrates, parsedMoves);
  console.log(parsedCrates);
  console.log(
    parsedCrates
      .map((ele) => ele.peek())
      .reduce((prev, current) => prev.concat(current), "Moves 9001: ")
  );
};

start9000(input);
start9001(input);
