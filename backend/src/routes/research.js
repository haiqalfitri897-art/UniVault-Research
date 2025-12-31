import express from 'express';
import {
  getAllResearch,
  createResearch,
  getResearchById,
  updateResearch,
  deleteResearch,
} from '../controllers/researchController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllResearch);
router.get('/:id', getResearchById);

// Protected routes
router.post('/', verifyToken, createResearch);
router.put('/:id', verifyToken, updateResearch);
router.delete('/:id', verifyToken, deleteResearch);

export default router;
