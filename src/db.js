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
  db = new Low(adapter);

  await db.read();

  db.data ||= { cards: [] };

  await db.write();
};

const getCards = async () => {
  const { JSONFile, Low } = low;
  const adapter = new JSONFile(config.dbPath);
  db = new Low(adapter);

  await db.read();

  return db?.data?.cards ?? [];
};

module.exports = {
  initLowDb,
  getCards,
};
