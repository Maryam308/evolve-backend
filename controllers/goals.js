// controllers/goals.js
const express = require("express");
const router = express.Router();

// Temporary array to store goals (will replace with MongoDB Model later)
let goals = [];

// GET all goals for the user
router.get("/", (req, res) => {
  res.json(goals);
});

// POST to create a new goal
router.post("/", (req, res) => {
  const goal = req.body;
  goal.id = goals.length + 1; // Simple ID generation
  goals.push(goal);
  res.status(201).json(goal);
});

// PUT to update an existing goal
router.put("/:id", (req, res) => {
  const goalId = parseInt(req.params.id);
  const index = goals.findIndex(g => g.id === goalId);
  if (index !== -1) {
    goals[index] = { ...goals[index], ...req.body };
    res.json(goals[index]);
  } else {
    res.status(404).json({ message: "Goal not found" });
  }
});

// DELETE a goal
router.delete("/:id", (req, res) => {
  const goalId = parseInt(req.params.id);
  const index = goals.findIndex(g => g.id === goalId);
  if (index !== -1) {
    const deletedGoal = goals.splice(index, 1);
    res.json(deletedGoal[0]);
  } else {
    res.status(404).json({ message: "Goal not found" });
  }
});

module.exports = router;
