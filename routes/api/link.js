const router = require("express").Router();
const Link = require("../../database/models/Link");

router.get("/:id", async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) {
      return res.status(404).json({ message: "No such link exists" });
    }
    link.clicks = link.clicks + 1;
    const newLink = await link.save();
    return res.status(200).json({ link: newLink._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Couldnt get any links" });
  }
});

module.exports = router;
