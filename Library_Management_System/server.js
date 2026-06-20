const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Book = require("./models/Book");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

app.post("/add-book", async (req, res) => {
    try {
        const { bookName, authorName, category, price, quantity } = req.body;

        const newBook = new Book({
            bookName,
            authorName,
            category,
            price,
            quantity
        });

        await newBook.save();

        res.json({
            message: "Book added successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding book"
        });
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching books"
        });
    }
});

app.delete("/delete-book/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting book"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});