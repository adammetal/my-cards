let low = {};

let config = {
  dbPath: "",
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
  const { JSONFile, Low } = low;
  const adapter = new JSONFile(config.dbPath);
  const db = new Low(adapter);

  await db.read();

  return db?.data?.cards ?? [];
};

const getCard = async (id) => {
  const { JSONFile, Low } = low;
  const adapter = new JSONFile(config.dbPath);
  const db = new Low(adapter);

  await db.read();

  return db.data.cards.find((card) => card.id === id) ?? {};
};

const addCard = async (card) => {
  const { JSONFile, Low } = low;
  const adapter = new JSONFile(config.dbPath);
  const db = new Low(adapter);

  await db.read();

  db.data.cards.push(card);

  await db.write();
};

module.exports = {
  initLowDb,
  getCards,
  getCard,
  addCard
};
