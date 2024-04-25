const express = require("express");

const {handleGenerateNewShortURL, handleRedirectURL, handleGetAnalytics} = require("../controllers/url")

const { URL } = require("../models/url")

const router = express.Router();

// const myMiddleware = function(req, res, next) {
//     next(); 
// };

// router.use(myMiddleware);

router.post("/", handleGenerateNewShortURL);

router.get("/:shortId", handleRedirectURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

