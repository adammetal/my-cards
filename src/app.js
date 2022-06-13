const express = require("express");
const { getCards } = require("./db");

const app = express();

app.get("/api/cards", async (req, res) => {
  const cards = getCards();
  return res.json(cards);
});

app.get("/api/cards/:id", (req, res) => {
  res.status(200).end();
});

app.post("/api/cards", (req, res) => {});

app.delete("/api/cards", (req, res) => {});

app.patch("/api/cards", (req, res) => {});

module.exports = app;
