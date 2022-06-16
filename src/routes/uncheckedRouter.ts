import { Router } from 'express';
import login from '@/controllers/unchecked/login';
import logout from '@/controllers/unchecked/logout';
import oauth from '@/controllers/unchecked/oauth';

const uncheckedRouter = Router();

uncheckedRouter.get('/oauth', oauth);
uncheckedRouter.get('/login', login);
uncheckedRouter.get('/logout', logout);

export default uncheckedRouter;
