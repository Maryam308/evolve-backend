const mongoose = require("mongoose");

const reflectionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    initialSituation: {
      type: String,
      required: false,
    },
    actionsImplemented: {
      type: String,
      required: false,
    },
    keyOutcomes: {
      type: String,
      required: false,
    },
    improvementPlans: {
      type: String,
      required: false,
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
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reflections: [reflectionSchema],
  },
  { timestamps: true }
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
