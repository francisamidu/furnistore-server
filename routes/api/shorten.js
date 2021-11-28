const router = require("express").Router();
const { customAlphabet, urlAlphabet } = require("nanoid");

const Link = require("../../database/models/Link");

const validateLink = require("../../middlewares/validateLink");

router.post("/", validateLink, async (req, res) => {
  try {
    const url = req.body.url;
    const generator = customAlphabet(urlAlphabet, 5);
    const shortURL = generator();
    const link = new Link({
      shortUrl: shortURL,
      fullUrl: url,
    });
    const newLink = await link.save();
    return res.status(201).json(newLink._doc);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Whoops something went wrong" });
  }
});

module.exports = router;
