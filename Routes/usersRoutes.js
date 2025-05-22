const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getUsers,
  getMe,
} = require("../Controller/userController");
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.get("/all", getUsers);
router.get("/me", authMiddleware, getMe);

module.exports = router;
