import { getInput, splitLines } from "../utils/index.js";

import * as fs from "fs/promises";

let input = ``;
try {
  const filePath = new URL("./input.txt", import.meta.url);

  console.log("the meta url", import.meta.url);
  input = await fs.readFile(filePath, { encoding: "utf-8" });
  input.trim();
} catch (error) {
  console.error(error);
}

// input = `move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2
// `;
let sanatiseMoves = (input) =>
  input
    .trim()
    .split("\n")
    .map((ele) =>
      ele
        .slice(5, ele.length)
        .split("from")
        .map((ele) => ele.trim().split("to").map(Number))
    );

//              1           2               3

// let stacks = [["Z", "N"], ["M", "C", "D"], ["P"]];

let stacks = [
  "PFMQWGRT",
  "RFH",
  "PZRVGHSD",
  "QHPBFWG",
  "PSMJH",
  "MZTHSRPL",
  "PTHNML",
  "FDQR",
  "DSCNLPH",
].map((ele) => ele.split(""));

let moveOne = (input, from, to) => {
  let crate = input[from - 1].pop();

  input[to - 1].push(crate);
};

let moveMany = (input, stacks) => {
  let MyInput = sanatiseMoves(input);
  console.dir(MyInput, { depth: null });

  MyInput.forEach((element) => {
    for (let i = 0; i < element[0]; i++) {
      moveOne(stacks, element[1][0], element[1][1]);
    }
  });
};

let moveMultiple = (input, stacks) => {
  let MyInput = sanatiseMoves(input);
  console.dir(MyInput, { depth: null });

  MyInput.forEach((element) => {
    let pickUpAmount = element[0][0];
    let lengthOfFrom = stacks[element[1][0] - 1].length;

    let pickedUp = stacks[element[1][0] - 1].splice(
      lengthOfFrom - pickUpAmount,
      lengthOfFrom
    );
    // console.log("element[1][1]", element)
    stacks[element[1][1] - 1].push(...pickedUp);
  });
};

let getTopOnes = (arary) => {
  let myCopy = JSON.parse(JSON.stringify(arary));
  return myCopy.reduce((prev, current) => prev.concat(current.pop()), "");
};

// moveMany(input, stacks);
// moveOne(stacks, 2, 1);

moveMultiple(input, stacks);
console.log(stacks);

console.log(getTopOnes(stacks));
