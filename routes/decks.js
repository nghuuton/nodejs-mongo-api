const deckController = require("../controllers/decks");
const router = require("express-promise-router")();
const {
  validateParam,
  validateBody,
  schemas,
} = require("../helpers/routerHelpers");

router
  .route("/")
  .get(deckController.index)
  .post(validateBody(schemas.deckSchema), deckController.newDeck);
router
  .route("/:deckId")
  .get(validateParam(schemas.idSchema, "deckId"), deckController.getDeck)
  .put(
    validateParam(schemas.idSchema, "deckId"),
    validateBody(schemas.deckOPtionSchma),
    deckController.updateDeck
  )
  .delete(validateParam(schemas.idSchema, "deckId"), deckController.deleteDeck);

module.exports = router;
