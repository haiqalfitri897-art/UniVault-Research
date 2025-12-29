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

// All research routes require authentication
router.use(verifyToken);

router.get('/', getAllResearch);
router.post('/', createResearch);
router.get('/:id', getResearchById);
router.put('/:id', updateResearch);
router.delete('/:id', deleteResearch);

export default router;
