import express from 'express';
import apiRoutes from './apiRoutes';

const router = express.Router();

router.use('/api', apiRoutes);

export default router;
