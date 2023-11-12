import * as fs from "node:fs/promises";

try {
  let initial = await fs.readFile("./input.txt", "utf8");
  initial = initial.split("\n\n");

  let subArrayIndex = 0;
  let result = [];
  initial.forEach((element) => {
    // console.log(element.split("\n"));

    result.push(element.split("\n"));
  });

  let sum = (array) => array.reduce((a, b) => a + b, 0);
  //   let theSum;
  //   console.log(result);
  let newResult = result.map((elementsOfEach) => {
    let theSum = elementsOfEach.reduce(
      (previousValue, currentValue) =>
        parseInt(previousValue) + parseInt(currentValue),
      0
    );

    return theSum;
  });

  let thirdBiggest = 0;
  let secondBiggest = 0;
  let biggest = 0;
  let index = 0;
  console.log("answer", sum(newResult.sort((a, b) => b - a).splice(0, 3)));
  newResult.forEach((anElement) => {
    if (anElement > biggest) {
      biggest = anElement;
      index++;
    } else if (anElement > secondBiggest) {
      secondBiggest = anElement;
      index++;
    } else if (anElement > thirdBiggest) {
      thirdBiggest = anElement;
      index++;
    } else {
      index++;
      return;
    }
  });

  console.log(biggest);
} catch (error) {
  console.error(error);
}
