import { Router } from 'express';
import checkAuth from 'middlewares/checkAuth';
import {
  checkProduct,
  createOne,
  getCategories,
  getMany,
  getMine,
  getOne,
} from './product.controller';
import { createOneRule } from './product.validator';

const router = Router();

router.post('/', checkAuth({ roles: ['seller'] }), createOneRule, createOne);
router.get('/my_products', checkAuth({ roles: ['seller'] }), getMine);
router.get('/categories', getCategories);

router.get('/:id', checkAuth(), checkProduct, getOne);
router.get('/', checkAuth(), getMany);

export default router;
