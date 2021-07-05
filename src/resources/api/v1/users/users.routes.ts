import { Router } from 'express';
import checkAuth from 'middlewares/checkAuth';
import { getCurrentUser } from './users.controller';

const router = Router();

router.get('/current_user', checkAuth(), getCurrentUser);

export default router;
