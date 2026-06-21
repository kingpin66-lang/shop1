const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/shop1")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Model
const Category = mongoose.model("Category", categorySchema);

// Get all categories
app.get("/", async (req, res) => {
   await res.send("backend is running")
})
app.get("/categories", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Get one category
app.get("/categories/:id", async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.json(category);
});

// Add category
app.post("/categories", async (req, res) => {
    const category = new Category({
        name: req.body.name
    });

    await category.save();
    res.json(category);
});

// Update category
app.put("/categories/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
    );

    res.json(category);
});

// Delete category
app.delete("/categories/:id", async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);

    res.json({
        message: "Category deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});