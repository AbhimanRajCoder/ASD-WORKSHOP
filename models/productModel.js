const fs = require("fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "../db.json");

const cache = {};

async function readFile() {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading db.json:", err);
    throw err;
  }
}

async function readFileWithDelay() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await readFile();
}

async function getAllProducts(cacheKey) {
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  const products = await readFileWithDelay();
  cache[cacheKey] = products;
  return products;
}


async function getProductById(id, cacheKey) {
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }
  const products = await readFileWithDelay();
  const product = products.find((p) => p.id === id);
  if (product) {
    cache[cacheKey] = product;
  }
  return product;
}

module.exports = {
  getAllProducts,
  getProductById
};
