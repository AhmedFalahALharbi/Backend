import express from 'express';
import { createAuthor, getAuthorBooks } from '../controllers/authorController.js';

const router = express.Router();

router.post('/', createAuthor);
router.get('/:id/books', getAuthorBooks);

export default router;
