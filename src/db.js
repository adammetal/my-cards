let low = {};

let config = {
  dbPath: "",
};

const openDb = async () => {
  if (!low.JSONFile || !low.Low) {
    throw new Error("Missing database initialization");
  }

  const { JSONFile, Low } = low;
  const adapter = new JSONFile(config.dbPath);
  const db = new Low(adapter);

  await db.read();

  if (!db?.data?.cards) {
    throw new Error("Missing cards array from database");
  }

  return db;
};

const initLowDb = async (dbPath) => {
  config.dbPath = dbPath;

  const { Low, JSONFile } = await import("lowdb");

  low.Low = Low;
  low.JSONFile = JSONFile;

  const adapter = new JSONFile(dbPath);
  const db = new Low(adapter);

  await db.read();

  db.data ||= { cards: [] };

  await db.write();
};

const getCards = async () => {
  const db = await openDb();
  return db.data.cards;
};

const getCard = async (id) => {
  const db = await openDb();
  return db.data.cards.find((card) => card.id === id);
};

const addCard = async (card) => {
  const db = await openDb();
  db.data.cards.push(card);
  await db.write();
};

const deleteCard = async (id) => {
  const db = await openDb();

  const index = db.data.cards.findIndex((card) => card.id === id);

  if (index === -1) {
    throw new Error("Card not found");
  }

  db.data.cards.splice(index, 1);
  await db.write();
};

const updateCard = async (id, card) => {
  const db = await openDb();

  const index = db.data.cards.findIndex((card) => card.id === id);

  if (index === -1) {
    throw new Error("Card not found");
  }

  db.data.cards[index] = {
    ...db.data.cards[index],
    ...card,
  };

  await db.write();

  return db.data.cards[index];
};

module.exports = {
  initLowDb,
  getCards,
  getCard,
  addCard,
  deleteCard,
  updateCard,
};
