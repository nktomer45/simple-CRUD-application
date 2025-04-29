const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { validateUserInput } = require("../middleware/validationMiddleware");

const router = express.Router();

router.route("/")
.get(getUsers)
.post(validateUserInput, createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(validateUserInput, updateUser)
  .delete(deleteUser);

module.exports = router;
