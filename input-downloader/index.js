import https from "node:https";
import fs from "node:fs";
import path from "node:path";

/**
 * Downloads the inputs for a specific day of Advent of Code and saves it to a file.
 * @param {number} day - The day of the challenge (1-25).
 * @param {number} year - The year of the challenge.
 * @param {string} session - Your Advent of Code session cookie.
 * @returns {Promise<string>} - Resolves to the file path where inputs are saved.
 * @throws {Error} - If the download or file save fails.
 */
export async function saveInputsToFile(day, year, session, dir = ".") {
  validateArguments(day, year, session);

  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const options = {
    headers: {
      Cookie: `session=${session}`,
    },
  };

  await fs.promises.mkdir(dir, { recursive: true });
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(dir, `day-${day}-inputs.txt`);
    const stream = fs.createWriteStream(filePath);

    https
      .get(url, options, (res) => {
        if (res.statusCode === 200) {
          res.pipe(stream);
          stream.on("finish", () => {
            stream.close(() => {
              console.log(
                `Advent of Code input for the day ${day} saved successfully to ${filePath}.`,
              );
              resolve(filePath);
            });
          });

          stream.on("error", (err) => {
            reject(new Error(`Failed to write to file: ${err.message}`));
          });
        } else {
          reject(
            new Error(
              `Failed to download the input file. Code: ${res.statusCode}`,
            ),
          );
        }
      })
      .on("error", (err) => {
        reject(new Error(`The HTTPS request failed: ${err.message}`));
      });
  });
}

function validateArguments(day, year, session) {
  const date = new Date();

  if (day < 1 || day > date.getDate()) {
    throw new Error(`The day must be between 1 and ${date.getDate()}`);
  }

  if (year < 2015 || year > date.getFullYear()) {
    throw new Error(`The year must be between 2015 and ${date.getFullYear()}`);
  }

  if (!session) {
    throw new Error("Session cookie is required. Get it from your browser.");
  }
}
