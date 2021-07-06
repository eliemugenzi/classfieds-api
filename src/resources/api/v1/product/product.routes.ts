import { Router } from 'express';
import checkAuth from 'middlewares/checkAuth';
import { checkProduct, createOne, getMany, getMine, getOne } from './product.controller';
import { createOneRule } from './product.validator';

const router = Router();

router.post('/', checkAuth({ roles: ['seller'] }), createOneRule, createOne);
router.get('/:id', checkAuth(), checkProduct, getOne);
router.get('/', checkAuth(), getMany);
router.get('/my_products', checkAuth({ roles: ['seller'] }), getMine);

export default router;
