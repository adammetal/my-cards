const db = require("./src/db");

(async () => {
  await db.initLowDb("./database/test.json");
  const cards = await db.getCards();
  console.log(cards);
})();
