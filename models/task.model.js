const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    summary: String,
    startDate: String,
    endDate: String,
    effortSpent: Number,
    priority: {
      type: String,
      required: true,
      enum: ["High", "Medium", "Low"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Ready", "In Progress", "Testing", "Done"],
      default: "Ready",
    },
    taskType: String,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
