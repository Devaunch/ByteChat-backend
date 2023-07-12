import { Router } from 'express';
import { verifyToken } from '../middleware/verifyToken';
import { Edit } from '../controllers/User';
const router = Router();

router.use('/edit', verifyToken, Edit);

export default router;
