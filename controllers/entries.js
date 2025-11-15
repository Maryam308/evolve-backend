const express = require("express");
const verifyToken = require("../middleware/verify-token.js");
const { Entry, Reflection } = require("../models/entry.js");
const router = express.Router();

// GET all entries
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

// GET specific entry
router.get("/:entryId", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId)
      .populate("author")
      .populate("reflections");

    console.log("Entry fetched:", {
      id: entry._id,
      type: entry.entryType,
      keyOutcomes: entry.keyOutcomes,
      improvementPlan: entry.improvementPlan,
      initialSituation: entry.initialSituation,
      actionsImplemented: entry.actionsImplemented,
      reflections: entry.reflections,
    });

    res.status(200).json(entry);
  } catch (err) {
    console.error("Error fetching entry:", err);
    res.status(500).json({ err: err.message });
  }
});

// POST create new entry
router.post("/", verifyToken, async (req, res) => {
  try {
    req.body.author = req.user._id;
    console.log("Creating entry with data:", req.body);
    const entry = await Entry.create(req.body);
    entry._doc.author = req.user;
    res.status(201).json(entry);
  } catch (err) {
    console.error("Error creating entry:", err);
    res.status(500).json({ err: err.message });
  }
});

// POST create reflection on an entry
router.post("/:entryId/reflections", verifyToken, async (req, res) => {
  try {
    // Create the reflection document
    const reflection = await Reflection.create({
      reflectionText: req.body.reflectionText,
      entry: req.params.entryId,
    });

    // Add the reflection reference to the entry
    const entry = await Entry.findById(req.params.entryId);
    entry.reflections.push(reflection._id);
    await entry.save();

    // Return the updated entry with populated data
    const updatedEntry = await Entry.findById(req.params.entryId)
      .populate("author")
      .populate("reflections");

    res.status(201).json(updatedEntry);
  } catch (err) {
    console.error("Error creating reflection:", err);
    res.status(500).json({ err: err.message });
  }
});

// PUT update a specific entry
router.put("/:entryId", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    if (entry.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    console.log("Updating entry with data:", req.body);

    const updatedEntry = await Entry.findByIdAndUpdate(
      req.params.entryId,
      req.body,
      { new: true }
    )
      .populate("author")
      .populate("reflections");

    console.log("Updated entry:", {
      id: updatedEntry._id,
      type: updatedEntry.entryType,
      keyOutcomes: updatedEntry.keyOutcomes,
      improvementPlan: updatedEntry.improvementPlan,
      initialSituation: updatedEntry.initialSituation,
      actionsImplemented: updatedEntry.actionsImplemented,
    });

    res.status(200).json(updatedEntry);
  } catch (err) {
    console.error("Error updating entry:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE a specific entry along with its reflections
router.delete("/:entryId", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.entryId);

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    if (entry.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await Reflection.deleteMany({ entry: entry._id });
    await Entry.findByIdAndDelete(req.params.entryId);

    res
      .status(200)
      .json({ message: "Entry and related reflections deleted successfully" });
  } catch (err) {
    console.error("Error deleting entry:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
