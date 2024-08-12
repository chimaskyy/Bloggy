const { getUsers, getUserById } = require("../controllers/userController");
const { isAuthenticated, isBlogOwner } = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", isAuthenticated, getUserById);

module.exports = router;
