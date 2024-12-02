import { readFile } from "node:fs/promises";

async function getColumnsFromInput() {
  try {
    const file = await readFile("./day-1-inputs.txt", { encoding: "utf8" });
    const rows = file.trim().split("\n");

    const firstColumn = [];
    const secondColumn = [];

    rows.forEach((row) => {
      const columns = row.split("   ");
      firstColumn.push(Number(columns[0]));
      secondColumn.push(Number(columns[1]));
    });

    return { firstColumn, secondColumn };
  } catch (error) {
    console.error(error);
  }
}

const { firstColumn, secondColumn } = await getColumnsFromInput();
firstColumn.sort();
secondColumn.sort();

let totalDistance = 0;
for (let i = 0; i < firstColumn.length; i++) {
  totalDistance += Math.abs(firstColumn[i] - secondColumn[i]);
}

console.log(totalDistance);

let similarityScore = 0;
for (let i = 0; i < firstColumn.length; i++) {
  let numberOfAppearances = 0;
  for (let j = 0; j < secondColumn.length; j++) {
    if (firstColumn[i] === secondColumn[j]) {
      numberOfAppearances++;
    }
  }

  similarityScore += firstColumn[i] * numberOfAppearances;
}
console.log(similarityScore);
