const router = require("express").Router();

const Link = require("../../database/models/Link");

router.get("/", async (req, res) => {
  try {
    const links = await Link.find({});
    if (!links) {
      return res.status(404).json({ message: "No links found" });
    }
    return res.status(200).json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Couldnt get any links" });
  }
});

module.exports = router;
