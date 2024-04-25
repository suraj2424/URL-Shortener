const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 8);

const { URL } = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "url is required" });
    }
    const short = nanoid();
    await URL.create({
        shortId: short,
        redirectURL: body.url,
        visitHistory: [],
        createdBy : req.user._id,
    });

    return res.render("home", {
        id: short,
    })
}

async function handleRedirectURL(req,res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            }
        }
    );
    res.redirect(entry.redirectURL);
    
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks : result.visitHistory.length,
        analytics : result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleRedirectURL,
    handleGetAnalytics,
};