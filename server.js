const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful and server run on ${PORT} port.`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
