import Author from '../models/Author.js';

export const createAuthor = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newAuthor = new Author({ name, bio });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuthorBooks = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
