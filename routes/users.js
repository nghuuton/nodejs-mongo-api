const express = require("express");
// const router = express.Router();
const userController = require("../controllers/users");
const router = require("express-promise-router")();

router.route("/").get(userController.index).post(userController.newUser);
router
  .route("/:userId")
  .get(userController.getUser)
  .put(userController.replaceUser)
  .patch(userController.updateUser);

module.exports = router;
