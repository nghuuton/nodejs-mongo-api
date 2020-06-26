const express = require("express");
// const router = express.Router();
const userController = require("../controllers/users");
const router = require("express-promise-router")();
const { validateParam, schemas } = require("../helpers/routerHelpers");

router.route("/").get(userController.index).post(userController.newUser);
router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), userController.getUser)
  .put(userController.replaceUser)
  .patch(userController.updateUser);

router
  .route("/:userId/decks")
  .get(userController.getUserDeck)
  .post(userController.newUserDeck);

module.exports = router;
