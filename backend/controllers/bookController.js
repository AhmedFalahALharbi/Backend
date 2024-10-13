import Book from '../models/Book.js';
import Author from '../models/Author.js';

export const createBook = async (req, res) => {
  try {
    const { bookName, authorId, edition, publicationDate, hasEbook, price, supportedLanguages, category, userId } = req.body;

    const newBook = new Book({
      bookName,
      author: authorId,
      edition,
      publicationDate,
      hasEbook,
      price,
      supportedLanguages,
      category,
      addedByUser: userId,
    });

    const savedBook = await newBook.save();
    await Author.findByIdAndUpdate(authorId, { $push: { books: savedBook._id } });

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
