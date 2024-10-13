import express from 'express';
import { createBook, getAllBooks } from '../controllers/bookController.js';

const router = express.Router();

router.post('/', createBook);
router.get('/', getAllBooks);

export default router;
