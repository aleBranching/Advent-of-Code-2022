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

// input = "bvwbjplbgvbhsrlpgdmjqwftvncz";

let processString = (input) => {
  for (let i = 0; i < input.length; i += 1) {
    let subString = input.slice(i, i + 4);
    console.log(subString);
    console.log(new Set(subString));
    console.log(new Set(subString).size);

    if (new Set(subString).size == 4) {
      console.log("HERE", i + 4);
      return i;
    }
  }
};

let processStringPartTwo = (input) => {
  for (let i = 0; i < input.length; i += 1) {
    let subString = input.slice(i, i + 14);
    console.log(subString);
    console.log(new Set(subString));
    console.log(new Set(subString).size);

    if (new Set(subString).size == 14) {
      console.log("HERE", i + 14);
      return i;
    }
  }
};
processString(input);
processStringPartTwo(input);
