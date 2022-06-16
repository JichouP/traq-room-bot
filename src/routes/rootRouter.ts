import { Router } from 'express';
import { getMe } from '@/controllers/root/me';
import getPing from '@/controllers/root/ping';

const rootRouter = Router();

rootRouter.get('/ping', getPing);
rootRouter.get('/me', getMe);

export default rootRouter;
