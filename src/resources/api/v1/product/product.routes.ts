import { Router } from 'express';
import checkAuth from 'middlewares/checkAuth';
import { checkProduct, createOne, getMany, getOne } from './product.controller';
import { createOneRule } from './product.validator';

const router = Router();

router.post('/', checkAuth({ roles: ['seller'] }), createOneRule, createOne);
router.get('/:id', checkAuth(), checkProduct, getOne);
router.get('/', checkAuth(), getMany);

export default router;
