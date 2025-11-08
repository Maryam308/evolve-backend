const mongoose = require("mongoose");

// Reflection Schema
const reflectionSchema = new mongoose.Schema(
  {
    reflectionText: {
      type: String,
      required: true,
      trim: true,
    },

    entry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entry",
      required: true,
    },
  },
  { timestamps: true }
);

// Create Reflection Model
const Reflection = mongoose.model("Reflection", reflectionSchema);

// Entry Schema
const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    initialSituation: {
      type: String,
      trim: true,
    },
    actionsImplemented: {
      type: String,
      trim: true,
    },
    keyOutcomes: {
      type: String,
      trim: true,
    },
    improvementPlan: {
      type: String,
      trim: true,
    },
    entryType: {
      type: String,
      required: true,
      enum: ["Lesson", "Achievement"],
    },
    entryCategory: {
      type: String,
      required: true,
      enum: ["Career", "Relationships", "Hobbies", "Personal"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // References to Reflection documents
    reflections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reflection",
      },
    ],
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

// Export both models
module.exports = { Entry, Reflection };
