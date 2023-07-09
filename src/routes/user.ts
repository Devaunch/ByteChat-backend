import { Router } from 'express';
import { verifyToken } from 'src/middleware/verifyToken';
import { Edit } from 'src/controllers/User';
const router = Router();

router.use('/edit', verifyToken, Edit);

export default router;
