import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import authorRoutes from './routes/authorRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
