const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Entry = require("../models/entry.js");
const router = express.Router();

//GET
//get all entries
router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await Hoot.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//get specific entry
router.get("/:entryId", verifyToken, async (req, res) => {
  try {
    // populate author of entry and reflections
    const entry = await Entry.findById(req.params.entryId).populate([
      "author",
      "reflections.author",
    ]);
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//POST
//Create new entry
router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    const entry = await Entry.create(req.body);
    entry._doc.author = req.user;
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

//PUT
//update a specific entry

//DELETE
//delete a specific entry
router.delete("/:entryId", verifyToken, async (req, res) => {
  try {const entry = await Entry.findById(req.params.entryId);

if (!entry) {
  return res.status(404).json({ error: "Entry not found" });
}

} catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
