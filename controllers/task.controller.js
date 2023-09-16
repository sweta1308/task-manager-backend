const mongoose = require("mongoose");
const fs = require("fs");
const Task = require("../models/task.model");

const jsonData = fs.readFileSync("./data/tasks.json", "utf8");
const tasks = JSON.parse(jsonData);

async function seedDatabase() {
  try {
    for (const task of tasks) {
      const newTask = new Task({
        name: task.name,
        assignee: task.assignee,
        summary: task.summary,
        startDate: task.startDate,
        endDate: task.endDate,
        priority: task.priority,
        status: task.status,
        effortSpent: task.effortSpent,
        taskType: task.taskType,
      });

      await newTask.save();
      console.log(`Movie "${newTask.name}" seeded.`);
    }
    console.log("Database seeding complete.");
  } catch (e) {
    console.error("Error seeding database:", e);
  } finally {
    mongoose.disconnect();
  }
}

async function readAllTasks() {
  try {
    const getAllTask = await Task.find({});
    console.log(getAllTask);
    return getAllTask;
  } catch (e) {
    console.error(`Error in reading task: `, e);
  }
}

async function createTask(taskData) {
  try {
    const newTask = new Task(taskData);
    const addedData = await newTask.save();
    console.log(addedData);
    return addedData;
  } catch (e) {
    console.error(`Error in creating task: `, e);
  }
}

async function updateTask(taskId, updatedData) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updatedData, {
      new: true,
    });
    if (updatedTask) {
      console.log(updatedTask);
      return updatedTask;
    } else {
      console.log("Task not found!");
    }
  } catch (e) {
    console.error(`Error in updating task: `, e);
  }
}

async function deleteTask(taskId) {
  try {
    const taskDeleted = await Task.findByIdAndDelete(taskId);
    if (taskDeleted) {
      console.log(taskDeleted);
      return taskDeleted;
    } else {
      console.log("Task not found!");
    }
  } catch (e) {
    console.error(`Error in deleting task: `, e);
  }
}

module.exports = {
  seedDatabase,
  readAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
