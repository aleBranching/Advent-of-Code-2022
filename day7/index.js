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

const CHANGE_DIRECTORY = "changeDirectory";
const FILE = "file";
let getTypeOfCommand = (string) => {
  if (string.startsWith("$ cd")) {
    return CHANGE_DIRECTORY;
  }
  if (/\d/.test(string[0])) {
    return FILE;
  } else {
    return null;
  }
};

let processInput = (input, indexToStop) => {
  let currentDirectory = ["."];
  let directoryMap = new Map();
  let splittedInput = input.split("\n");
  for (let element of splittedInput) {
    let command = getTypeOfCommand(element);
    if (command == CHANGE_DIRECTORY) {
      let [_, __, dir] = element.split(" ");
      if (dir == ".." && currentDirectory.length) {
        currentDirectory.pop();
        continue;
      }
      if (dir == "/") {
        currentDirectory.splice(1);
        continue;
      }
      currentDirectory.push(dir);
    }
    if (command == FILE) {
      let [size, file] = element.split(" ");
      // console.log(index);
      if (isNaN(directoryMap.get(".")) && index < 20) {
        // console.log("___________________________-");
        // console.log("HERE");
        // console.log("index", index);
        // console.log(directoryMap);
      }
      let cwd = currentDirectory.join("/");
      directoryMap.set(cwd, (directoryMap.get(cwd) || 0) + Number(size));

      for (let i = currentDirectory.length - 1; i > 0; i--) {
        let cwd = currentDirectory.slice(0, i).join("/");
        directoryMap.set(cwd, (directoryMap.get(cwd) || 0) + Number(size));
      }
    }
  }

  // console.log(directoryMap);
  return directoryMap;
};

let sumOfAtMost10000 = (mapDirs) => {
  let sumValues = [];
  mapDirs.forEach((value, key) => {
    if (value < 10_0000) sumValues.push(value);
  });
  return sumValues.reduce((a, b) => a + b);
};
let smallestDirectory = (mapDirs) => {
  let values = [];
  let usedSpace = mapDirs.get(".");
  let totalDiskSpace = 70_000_000;
  let neededSpace = 30_000_000;
  let currentSpace = totalDiskSpace - usedSpace;
  let needToDelete = neededSpace - currentSpace;
  // console.log(usedSpace);
  // console.log(needToDelete);
  mapDirs.forEach((value, key) => {
    if (value >= needToDelete) values.push([value, key]);
  });
  let sorted = values.sort(([valueA, keyA], [valueB, keyB]) => valueA - valueB);
  console.log(values.sort(([valueA, keyA], [valueB, keyB]) => valueA - valueB));
  return sorted[0];
};
console.log("THIS ONE=============\n", smallestDirectory(processInput(input)));
