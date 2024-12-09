const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoModel = require("./Models/Todo");
const cors = require("cors");

// Define routes and middleware here
// ...
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://ShivaprasadK:eWing1234@cluster0.ci9ghf1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test"
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/add", async (req, res) => {
  const { task } = req.body;
  console.log(task);
  try {
    const newTask = await TodoModel.create({ task });
    res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await TodoModel.findByIdAndDelete(id);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/toggle/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await TodoModel.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});