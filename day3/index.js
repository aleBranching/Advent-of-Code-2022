console.log("DAY3");
// const input = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`;

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

let spitLines = (input) => {
  let split = input.trim().split("\n");
  return split.map((element) => {
    let itsLenght = element.length;
    if (itsLenght % 2 !== 0) {
      console.log("THERE IS AN ODD");
    }

    let firstHalf = element.slice(0, itsLenght / 2);
    let secondHald = element.slice(itsLenght / 2, itsLenght);

    return [firstHalf.split(""), secondHald.split("")];
  });
};

let sameElements = (first, second) =>
  first.reduce(
    (accum, current) =>
      second.includes(current) ? accum.concat(current) : accum,
    []
  );

let twoD = spitLines(input).map(([first, second]) => [
  sameElements(first, second).slice(0, 1),
]);

let flattened = twoD.map((elem) => {
  return elem[0][0];
});

let isLowerCase = (str) => {
  return str === str.toLowerCase() && str !== str.toUpperCase();
};

console.log(flattened);
console.log(
  flattened
    .map((elem) =>
      isLowerCase(elem) ? elem.charCodeAt(0) - 96 : elem.charCodeAt(0) - 38
    )
    .reduce((a, b) => a + b)
);

// spitLines(input).map(([a,b])=> )
