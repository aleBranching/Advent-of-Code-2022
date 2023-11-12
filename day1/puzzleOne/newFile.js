import * as fs from "node:fs/promises";
import { error } from "./solution";

try {
  let initial = await fs.readFile("./input.txt", "utf8");
  initial = initial.split("\n");
  let result = [[]];
  let subArrayIndex = 0;
  initial.forEach((element) => {
    if (element == "") {
      result.push([]);
      subArrayIndex++;
    } else {
      result[subArrayIndex].push(element);
    }
  });

  //   let theSum;
  result.map((elementsOfEach) => {
    let theSum = elementsOfEach.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    return theSum;
  });

  //   console.log(result);
  console.log(theSum);
} catch (error) {
  console.error(error);
}
