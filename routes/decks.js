const deckController = require("../controllers/decks");
const router = require("express-promise-router")();

router.route("/").get().post().put().delete();
