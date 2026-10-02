const fs = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "../db.json");

async function readDb() {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json:", err);
    throw err;
  }
}

async function readDbWithDelay() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await readDb();
}

async function writeDb(data) {
  try {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing db.json:", err);
    throw err;
  }
}

module.exports = {
  readDb,
  readDbWithDelay,
  writeDb
};
