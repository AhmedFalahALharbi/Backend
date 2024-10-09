require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3300;

app.use(express.json());

const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: String, required: true },
  edition: { type: Number, required: true },
  publicationDate: { type: Date, required: true },
  hasEbook: { type: Boolean, required: true },
  price: { type: Number, required: true },
  supportedLanguages: { type: [String], required: true },
  category: { type: String, required: true }
});

const Book = mongoose.model('Book', bookSchema);

app.post('/books', async (req, res) => {
  try {
    const bookData = new Book(req.body);
    const savedBook = await bookData.save();
    res.status(201).send(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).send('Error adding book');
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Error fetching books');
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).send('Error fetching book');
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).send('Error updating book');
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send('Book deleted successfully');
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).send('Error deleting book');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
