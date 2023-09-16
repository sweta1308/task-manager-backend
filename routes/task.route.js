const express = require("express");
const taskRouter = express.Router();

const {
  readAllTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

taskRouter.get("/", async (req, res) => {
  try {
    const tasks = await readAllTasks();
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch tasks!", e });
  }
});

taskRouter.post("/", async (req, res) => {
  try {
    const task = await createTask(req.body);
    if (task) {
      res.status(200).json({ message: "New task created!", task: task });
    } else {
      res.status(404).json({ error: "Task not added!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to add task!", e });
  }
});

taskRouter.post("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await updateTask(taskId, req.body);
    if (task) {
      res
        .status(200)
        .json({ message: "Task updated successfully!", task: task });
    } else {
      res.status(404).json({ error: "Task not found with the given id!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to update task!", e });
  }
});

taskRouter.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await deleteTask(taskId);
    if (task) {
      res
        .status(200)
        .json({ message: "Task deleted successfully!", task: task });
    } else {
      res.status(404).json({ error: "Task not found with the given id!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Failed to delete task!", e });
  }
});

module.exports = taskRouter;
