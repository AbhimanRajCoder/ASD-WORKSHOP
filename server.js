const fs = require("fs").promises;
const express = require("express");
const app = express();
const path = require('path');

const filepath = path.join(__dirname,"db.json");

async function readFile() {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}


async function readFilewithDelay(){
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,1500);
    })
    let products = await readFile();
    return products;
}


app.get("/products", async (req, res) => {
  try {
    const products = await readFilewithDelay();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read products"
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const products = await readFilewithDelay();

    const id = Number(req.params.id);

    const product = products.find((p) => p.id === id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read products"
    });
  }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
