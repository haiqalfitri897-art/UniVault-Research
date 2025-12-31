import express from 'express';
import { getAllInstitutions, getInstitutionById } from '../controllers/institutionController.js';

const router = express.Router();

router.get('/', getAllInstitutions);
router.get('/:id', getInstitutionById);

export default router;
