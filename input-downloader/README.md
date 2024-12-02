# Input-Downloader
**aoc-input-downloader** simplifies downloading inputs for Advent of Code challenges.
Authenticate with your session cookie and fetch inputs directly to your local machine in seconds!

## Features

- Download inputs for any day and year of Advent of Code.
- Authenticate using your Advent of Code session cookie.
- Save inputs directly to a specified directory.

---

## Installation

Install the package using your favorite package manager:

```bash
pnpm add aoc-input-downloader
```

---

## Usage

### Import the Package

```js
import { saveInputsToFile } from "aoc-input-downloader";
```

### Example

```js
import { saveInputsToFile } from "aoc-input-downloader";

const session = "your-session-cookie"; // Replace with your Advent of Code session cookie
const day = 1; // Day of the challenge (1-25)
const year = 2024; // Year of the challenge
const outputDir = "./aoc-inputs"; // Directory to save the input file

(async () => {
    try {
        const filePath = await saveInputsToFile(day, year, session, outputDir);
        console.log(`Input saved to: ${filePath}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
})();
```

---

## Obtaining Your Session Cookie

1. Log in to [Advent of Code](https://adventofcode.com).
2. Open your browser’s developer tools (usually accessible via `F12` or `Ctrl+Shift+I`).
3. Navigate to the **Application** or **Storage** tab.
4. Find your cookies for `https://adventofcode.com` and copy the value of the `session` cookie.
