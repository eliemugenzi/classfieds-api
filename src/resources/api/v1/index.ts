import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from 'swagger/v1';
import auth from './auth/auth.routes';
import products from './product/product.routes';
import users from './users/users.routes';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', auth);
router.use('/products', products);
router.use('/users', users);

export default router;
