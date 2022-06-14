const express = require("express");
const { v4: uuidv4 } = require("uuid");
const getCardMeta = require("./card-meta");
const { getCards, getCard, addCard, deleteCard, updateCard } = require("./db");

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

app.delete("/api/cards/:id", async (req, res) => {
  await deleteCard(req.params.id);
  res.status(200).end();
});

app.patch("/api/cards/:id", async (req, res) => {
  const updated = await updateCard(req.params.id, req.body);
  res.json(updated);
});

app.get("/api/cards/:id/meta", async (req, res) => {
  const card = await getCard(req.params.id);

  if (!card) {
    return res.status(400).end();
  }

  if (card.meta) {
    return res.json(card.meta);
  }

  const { name } = card;
  const meta = await getCardMeta(name);

  if (meta === null) {
    return res.status(404).end();
  }

  const updated = await updateCard(req.params.id, { meta });

  res.json(updated);
});

module.exports = app;
