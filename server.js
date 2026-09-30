const fs = require("fs");
const express = require("express");
const app = express();
const path = require('path');

const filepath = path.join(__dirname,"db.json");

app.get("/products", (req, res) => {
const data = fs.readFileSync(filepath,"utf-8")
res.json(data);
});

app.get("/products/:id", (req, res) => {
  const data = fs.readFileSync(filepath, "utf-8");

  const products = JSON.parse(data);

  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  res.json(product);
});




app.listen(3000, () => {
    console.log("Server running on port 3000");
});
