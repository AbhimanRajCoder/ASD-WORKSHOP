const fs = require("fs");
const express = require("express");
const app = express();

app.get("/products", (req, res) => {
const data = fs.readFileSync("db.json","utf-8")
res.json(data);
});





app.listen(3000, () => {
    console.log("Server running on port 3000");
});
