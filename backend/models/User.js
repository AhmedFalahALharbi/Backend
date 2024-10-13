import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

const User = mongoose.model('User', userSchema);
export default User;
