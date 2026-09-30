const fs = require("fs").promises;
const express = require("express");
const app = express();
const path = require('path');

const filepath = path.join(__dirname,"db.json");

app.get("/products", async (req, res) => {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read products"
    });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    const products = JSON.parse(data);

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
