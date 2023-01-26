// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
const mongoose = require("mongoose");
// const DB_HOST = "mongodb+srv://yanko-dima:zizA1402@cluster0.vovwqtq.mongodb.net/db-contacts?retryWrites=true&w=majority";
const { DB_HOST_HEROKU } = require(process.env.DB_HOST);

mongoose
  .connect(DB_HOST_HEROKU)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const contactsRouter = require("./routes/api/contacts");
// mongodb+srv://yanko-dima:zizA1402@cluster0.vovwqtq.mongodb.net/?retryWrites=true&w=majority

// const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use("/api/contacts", contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Servr Error" } = err;
//   res.status(status).json({ message });
// });

// module.exports = app;
