let text = "abcccdeee";
let text2 = "rffeeegghh";

let set1 = new Set(text.split(""));
let set2 = new Set(text2.split(""));

let grouped = [set1, set2];
// console.log(grouped);

let answer = [...grouped[0]].filter((ch) =>
  grouped.every((set) => set.has(ch))
);

console.log(answer);
