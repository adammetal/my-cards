const db = require("./src/db");
const app = require("./src/app");

const port = process.env?.PORT ?? 8080;

const main = async () => {
  await db.initLowDb("./database/test.json");
  app.listen(port, () => {
    console.log(`App listening on ${port}`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
