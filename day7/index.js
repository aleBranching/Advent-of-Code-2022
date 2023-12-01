// let input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;

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

// console.log(directoryMap);
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
  let index = -1;
  for (let element of splittedInput) {
    index += 1;
    if (index == indexToStop) {
      // console.log("======================\n");
      // console.log("mine\n");
      break;
      console.log(directoryMap);
    }
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
export function getSmallestDirToDelete(dirs) {
  const TOTAL_DISKSPACE = 70_000_000;
  const UNUSED_SPACE = 30_000_000;
  const usedSpace = dirs.get(".");
  const minRequired = UNUSED_SPACE - (TOTAL_DISKSPACE - usedSpace);
  let smallest = Infinity;

  for (let size of dirs.values()) {
    if (size >= minRequired && size < smallest) {
      smallest = size;
    }
  }

  return smallest;
}
// console.log(getSmallestDirToDelete(processInput(input)));
const ROOT = ".";

function getType(line) {
  if (line.startsWith("$")) return "command";
  if (line.startsWith("dir")) return "directory";
  return "file";
}

export function getDirectorySizes(input, indexToStop) {
  const lines = input.split("\n");
  const dirs = new Map();
  let currentDirectory = [ROOT];
  let index = -1;
  for (let line of lines) {
    index += 1;
    if (index == indexToStop) {
      // console.log("======================\n");
      // console.log("proper\n");
      // console.log(dirs);
      break;
    }
    if (getType(line) === "command") {
      let [, command, arg] = line.split(" ");

      if (command === "cd") {
        if (arg === "/") {
          currentDirectory.splice(1);
          continue;
        } else if (arg === "..") {
          currentDirectory.pop();
          continue;
        } else {
          currentDirectory.push(arg);
          continue;
        }
      }
    }

    if (getType(line) === "file") {
      const [size] = line.split(" ");
      const key = currentDirectory.join("/");

      dirs.set(key, (dirs.get(key) || 0) + Number(size));

      if (currentDirectory.length > 1) {
        for (let i = currentDirectory.length - 1; i > 0; i--) {
          const parentKey = currentDirectory.slice(0, i).join("/");

          dirs.set(parentKey, (dirs.get(parentKey) || 0) + Number(size));
        }
      }
    }
  }

  return dirs;
}

//let compare = (indexToStop) => {
//let properOne = getDirectorySizes(input, indexToStop);

//let myOne = processInput(input, indexToStop);
//const mapsAreEqual = (m1, m2) =>
//m1.size === m2.size &&
//Array.from(m1.keys()).every((key) => m1.get(key) === m2.get(key));

//let areEqual = mapsAreEqual(properOne, myOne);
//// console.log(areEqual);
//if (!areEqual) {
//console.log("-----------------------\n");
//console.log("mine", myOne);
//console.log("proper", properOne);
//}

//if (indexToStop == 99) {
//console.log("myOne: \n", myOne);
//console.log("properOne: \n", properOne);
//}
//return mapsAreEqual(properOne, myOne);
//};

//for (let i = 0; i < 100; i++) {
//if (compare(i) == false) {
//console.log("accident index", i);
//console.log("_____________\n");
//}
//}

// console.log("here", processInput(input, 11));
// console.log(getDirectorySizes(input, 11));
