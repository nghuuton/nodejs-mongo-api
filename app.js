const express = require("express");
const logger = require("morgan");
const mongooseClient = require("mongoose");
const bodyParser = require("body-parser");
const deckRoute = require("./routes/decks");
const usersRoute = require("./routes/users");

mongooseClient
  .connect("mongodb://localhost:27017/dtb-test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connecting Database");
  })
  .catch((err) => console.error(`${err} ✖ `));
mongooseClient.set("useFindAndModify", false);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use(logger("dev"));

// Routes
app.use("/users", usersRoute);
app.use("/decks", deckRoute);
// Loger Error
app.use((req, res, next) => {
  const err = new Error("Not found!");
  err.status = 404;
  next(err);
});

// Error handle
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log("✅ Server is start");
});
