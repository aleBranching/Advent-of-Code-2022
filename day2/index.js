import * as fs from "fs/promises";
import { url } from "inspector";

let input = ``;

try {
  const filePath = new URL("./input.txt", import.meta.url);

  // console.log("the meta url", import.meta.url);
  input = await fs.readFile(filePath, { encoding: "utf-8" });
  // console.log("input", input);
} catch (error) {
  console.error(error);
}
//#endregion// opponent
// rock     = A = 1
// paper    = B = 2
// scissors = C = 3

// me
// rock     = X = 1
// paper    = Y = 2
// scissors = Z = 3

// plus the outcome
// lost = 0
// draw = 3
// win = 6

let sum = (anArray) => anArray.reduce((a, b) => a + b, 0);

let matchWinner = (playerA, playerB) => {
  if (playerA == "A") {
    // rock
    switch (playerB) {
      case "X": // rock
        return 4;
      case "Y": // paper
        return 8;
      case "Z":
        return 3;
    }
  } else if (playerA == "B") {
    //paper
    switch (playerB) {
      case "X": // rock
        return 1;
      case "Y": // paper
        return 5;
      case "Z":
        return 9;
    }
  } else if (playerA == "C") {
    // scissors
    switch (playerB) {
      case "X": // rock
        return 7;
      case "Y":
        return 2; // paper
      case "Z":
        return 6;
    }
  }
};

export function totalScore(input) {
  let matchesFormated = input
    .trim()
    .split("\n")
    .map((element) => element.split(" "));

  return sum(matchesFormated.map(([a, b]) => matchWinner(a, b)));
}
export function secondTotalScore(input) {
  let matchesFormated = input
    .trim()
    .split("\n")
    .map((element) => element.split(" "));

  // console.log(matchesFormated);
  // console.dir(
  //   matchesFormated.map(([a, b]) => secondPartMatchWinner(a, b)),
  //   { maxArrayLength: null }
  // );

  return sum(matchesFormated.map(([a, b]) => secondPartMatchWinner(a, b)));
}

let gamePoints = {
  rock: 1, // rock
  paper: 2, // paper
  scissors: 3,
}; // scissors
let matchPoint = {
  lose: 0,
  draw: 3,
  win: 6,
};

let secondPartMatchWinner = (playerA, playerB) => {
  if (playerA == "A") {
    // rock
    switch (playerB) {
      case "X": // lose
        return matchPoint.lose + gamePoints.scissors;
      case "Y": // draw
        return matchPoint.draw + gamePoints.rock;
      case "Z": // win
        return matchPoint.win + gamePoints.paper;
    }
  } else if (playerA == "B") {
    //paper
    switch (playerB) {
      case "X": // lose
        return matchPoint.lose + gamePoints.rock;
      case "Y": // draw
        return matchPoint.draw + gamePoints.paper;
      case "Z": // win
        return matchPoint.win + gamePoints.scissors;
    }
  } else if (playerA == "C") {
    // scissors
    switch (playerB) {
      case "X": // lose
        return matchPoint.lose + gamePoints.paper;
      case "Y": // draw
        return matchPoint.draw + gamePoints.scissors;
      case "Z": // win
        return matchPoint.win + gamePoints.rock;
    }
  }
};

// console.log("the RESULT: ", totalScore(input), {maxA});
console.log("second result", secondTotalScore(input));
