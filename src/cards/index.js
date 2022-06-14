const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
const getCardMeta = require("../card-meta");
const { getCards, getCard, addCard, deleteCard, updateCard } = require("../db");

const cardsApi = new Router();

cardsApi.use("/:id", async (req, res, next) => {
  const card = await getCard(req.params.id);

  if (!card) {
    return res.status(404).end("Card not found");
  }

  req.card = card;
  next();
});

cardsApi.get("/", async (req, res) => {
  const cards = await getCards();
  return res.json(cards);
});

cardsApi.get("/:id", async (req, res) => {
  res.json(req.card);
});

cardsApi.post("/", async (req, res) => {
  const card = req.body;
  card.id = uuidv4();
  await addCard(card);
  res.json(card);
});

cardsApi.delete("/:id", async (req, res) => {
  await deleteCard(req.card.id);
  res.status(200).end();
});

cardsApi.patch("/:id", async (req, res) => {
  const updated = await updateCard(req.card.id, req.body);
  res.json(updated);
});

cardsApi.get("/:id/meta", async (req, res) => {
  const card = req.card;

  if (card.meta) {
    return res.json(card.meta);
  }

  const { name } = card;
  const meta = await getCardMeta(name);

  const updated = await updateCard(card.id, { meta });

  res.json(updated);
});

module.exports = cardsApi;
