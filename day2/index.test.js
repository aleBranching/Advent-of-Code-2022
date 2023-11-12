import { totalScore, secondTotalScore } from "./index.js";

let input = `A Y
B X
C Z
`;

describe("match Total", () => {
  it("should return score of matches", () => {
    expect(totalScore(input)).toEqual(15);
  });
});

describe("Real strategy match Total", () => {
  it("should return score new score of matches ", () => {
    expect(secondTotalScore(input)).toEqual(12);
  });
});
