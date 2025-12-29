import express from 'express';
import { getDashboard, getStats, getActivity } from '../controllers/dashboardController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, getDashboard);
router.get('/stats', verifyToken, getStats);
router.get('/activity', verifyToken, getActivity);

export default router;
