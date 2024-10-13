import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
  edition: { type: String },
  publicationDate: { type: Date },
  hasEbook: { type: Boolean },
  price: { type: Number },
  supportedLanguages: [{ type: String }],
  category: { type: String },
  addedByUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
