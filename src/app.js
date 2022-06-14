const express = require("express");
const cards = require("./cards");

const app = express();

app.use(express.json());

app.use("/api/cards", cards);

module.exports = app;
