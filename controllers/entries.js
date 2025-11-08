const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const Entry = require("../models/entry.js");
const router = express.Router();

//GET
//get all entries
router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await Entry.find({})
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
router.put("/:entryId", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    if (entry.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.entryId,
      req.body,
      { new: true }
    ).populate("author");

    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE
//delete a specific entry
router.delete("/:entryId", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    if (entry.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await Entry.findByIdAndDelete(req.params.entryId);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
