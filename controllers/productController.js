const productModel = require("../models/productModel");

async function getProducts(req, res) {
  try {
    const key = req.url;
    const products = await productModel.getAllProducts(key);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to read products" });
  }
}

async function getProductById(req, res) {
  try {
    const key = req.url;
    const id = Number(req.params.id);

    const product = await productModel.getProductById(id, key);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to read products" });
  }
}

module.exports = {
  getProducts,
  getProductById
};
