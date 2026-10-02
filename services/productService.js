const db = require("../database/db");

async function getAllProducts() {
  return await db.readDbWithDelay();
}

async function getProductById(id) {
  const products = await db.readDbWithDelay();
  return products.find((p) => p.id === id);
}

async function createProduct(data) {
  const products = await db.readDb();
  const newId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const newProduct = { id: newId, ...data };
  products.push(newProduct);
  await db.writeDb(products);
  return newProduct;
}

async function updateProduct(id, data) {
  const products = await db.readDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  const updatedProduct = { id, ...data };
  products[index] = updatedProduct;
  await db.writeDb(products);
  return updatedProduct;
}

async function patchProduct(id, updates) {
  const products = await db.readDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updatedProduct = { ...products[index], ...updates, id };
  products[index] = updatedProduct;
  await db.writeDb(products);
  return updatedProduct;
}

async function deleteProduct(id) {
  const products = await db.readDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1);
  await db.writeDb(products);
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct
};
