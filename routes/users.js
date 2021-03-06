const express = require("express");
// const router = express.Router();
const userController = require("../controllers/users");
const router = require("express-promise-router")();
const {
  validateParam,
  schemas,
  validateBody,
} = require("../helpers/routerHelpers");

router
  .route("/")
  .get(userController.index)
  .post(validateBody(schemas.userSchema), userController.newUser);
router
  .route("/:userId")
  .get(validateParam(schemas.idSchema, "userId"), userController.getUser)
  .put(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userOptionalSchma),
    userController.replaceUser
  )
  .patch(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.userOptionalSchma),
    userController.updateUser
  );

router
  .route("/:userId/decks")
  .get(validateParam(schemas.idSchema, "userId"), userController.getUserDeck)
  .post(
    validateParam(schemas.idSchema, "userId"),
    validateBody(schemas.deckSchema),
    userController.newUserDeck
  );

module.exports = router;
