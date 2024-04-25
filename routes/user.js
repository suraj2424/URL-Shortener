const express = require("express");
const { handleUserSignup, handleUserLOGIN } = require("../controllers/user");

const router = express.Router();

router.post("/", handleUserSignup);

router.post("/login", handleUserLOGIN);

module.exports = router;
