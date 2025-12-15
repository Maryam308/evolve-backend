// controllers/challenges.js
const express = require("express");
const router = express.Router();

// Temporary array to store challenges (replace with MongoDB Model later)
let challenges = [];

// GET all challenges
router.get("/", (req, res) => {
  res.json(challenges);
});

// POST to create a new challenge
router.post("/", (req, res) => {
  const challenge = req.body;
  challenge.id = challenges.length + 1; // simple ID generation
  challenges.push(challenge);
  res.status(201).json(challenge);
});

// PUT to update a challenge
router.put("/:id", (req, res) => {
  const challengeId = parseInt(req.params.id);
  const index = challenges.findIndex(c => c.id === challengeId);
  if (index !== -1) {
    challenges[index] = { ...challenges[index], ...req.body };
    res.json(challenges[index]);
  } else {
    res.status(404).json({ message: "Challenge not found" });
  }
});

// DELETE a challenge
router.delete("/:id", (req, res) => {
  const challengeId = parseInt(req.params.id);
  const index = challenges.findIndex(c => c.id === challengeId);
  if (index !== -1) {
    const deleted = challenges.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ message: "Challenge not found" });
  }
});

module.exports = router;
