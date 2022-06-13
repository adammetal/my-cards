const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { getCards, getCard, addCard } = require("./db");

const app = express();

app.use(express.json());

app.get("/api/cards", async (req, res) => {
  const cards = await getCards();
  return res.json(cards);
});

app.get("/api/cards/:id", async (req, res) => {
  const card = await getCard(req.params.id);
  res.json(card);
});

app.post("/api/cards", async (req, res) => {
  const card = req.body;

  card.id = uuidv4();

  await addCard(card);

  res.json(card);
});

app.delete("/api/cards", (req, res) => {});

app.patch("/api/cards", (req, res) => {});

module.exports = app;
