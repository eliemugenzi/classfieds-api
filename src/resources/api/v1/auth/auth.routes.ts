import { Router } from 'express';
import checkAuth from 'middlewares/checkAuth';
import { login, logOut, signUp } from './auth.controller';
import { signUpRule, loginRule } from './auth.validator';

const router = Router();

router.post('/signup', signUpRule, signUp);
router.post('/login', loginRule, login);
router.get('/logout', checkAuth(), logOut);

export default router;
