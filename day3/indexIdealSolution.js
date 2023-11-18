import { getInput, splitLines } from "../utils/index.js";

let input = `vJrwpWtwJgWrhcsFMMfFFhFp
 jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
 PmmdzqPrVvPwwTWBwg
 wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
 ttgJtRGJQctTZtZT
 CrZsJsPPZsGzwwsLwLmpwMDw`;

let newSplitLines = (input) => {
  return splitLines(input).map((elem) => elem.trim());
};

// console.log(newSplitLines(input));

let splitElements = (input) => {
  return [
    input.slice(0, input.length / 2),
    input.slice(input.length / 2, input.length),
  ];
};

let filterForSameCh = (pairs) => {
  console.log("the pairs", pairs);
  const sets = pairs.map((elem) => new Set(elem.split("")));
  console.log("the sets", sets);
  let comoonChars = [...sets[0]].filter((ch) => {
    return sets.every((set) => set.has(ch));
    // return true;
  });
  return comoonChars[0];
};
function letterToPriority(ch) {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return letters.indexOf(ch) + 1;
}

console.log(
  newSplitLines(input)
    .map(splitElements)
    .map(filterForSameCh)
    .map(letterToPriority)
    .reduce((a, b) => a + b, 0)
);

// console.log(filterForSameCh(["aaabbccddee", "eeefffggg"]));
